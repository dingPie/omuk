import {
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { clearScreenDown } from 'readline';

import { Box, UseToastOptions } from '@chakra-ui/react';

import useAppToast from '@hooks/useAppToast';

import infoContent from './_fragment/infoContent';
import { getCount, setCount } from './util/function';
import { CALL_API_COUNT } from './util/index.data';

declare global {
  interface Window {
    kakao: any;
  }
}

interface UseKakaoMapProps {
  mapRef: RefObject<HTMLDivElement>;
  addressInput: string;
  mapRadius: number;
  categoryList: { name: string; state: boolean }[];
  setFindValue: (address: string) => void;
  onClose: () => void;
  onOpen: () => void;
}

const zoomObject: { [radius: number]: number } = {
  300: 4,
  500: 5,
  1000: 6,
  1500: 6,
  2000: 6,
};

const useKakaoMap = ({
  mapRef,
  addressInput,
  mapRadius,
  categoryList,
  setFindValue,
  onOpen,
  onClose,
}: UseKakaoMapProps) => {
  const [coord, setCoord] = useState<CoordType>({ lat: 0, lng: 0 }); // 주소를 좌표로 변환해야 함

  const [spots, setSpots] = useState<LocationDataType[]>([]);

  const kakaoMapRef = useRef<any>(null);
  const placeRef = useRef<any>(null);
  const infoRef = useRef<any>(null);
  const clustererRef = useRef<any>(null);

  const { toastUi } = useAppToast();

  const initMap = () => {
    setSpots([]);
    clustererRef.current.clear();
    infoRef.current.close();
  };

  const onClickSearchBtn = useCallback(() => {
    if (
      !mapRef.current ||
      !placeRef.current ||
      !kakaoMapRef.current ||
      !infoRef.current ||
      !addressInput
    )
      return;

    const { count, state } = getCount();
    if (state === 'BAN') {
      toastUi({
        title: '너무 많이 호출되었습니다. 내일 다시 사용해주세요!',
        status: 'error',
      });
      return;
    } else if (state === 'WARN' && count % 10 === 0) {
      toastUi({
        title: `현재 ${count}번 호출되었습니다. 100번이 오늘은 더 사용이 불가능해요!`,
        status: 'info',
      });
    }

    // 기존 매장, 클러스터, 인포윈도우 클리어
    initMap();
    onOpen();
    setCount(); // 호출할때마다 setCount 1 추가

    const timeout = setTimeout(() => {
      const placesSearchCB = (
        place: LocationDataType[],
        status: 'OK' | string,
        pagination: LocationPaginationType,
      ) => {
        if (status !== 'OK') return;
        showMarker(place);
        setSpots((prev) => getDeduplicationArray([...prev, ...place]));
        pagination.nextPage();
        if (!pagination.hasNextPage) return;
      };

      // 마커 데이터를 보여주는 콜백함수입니다.
      const showMarker = (place: LocationDataType[]) => {
        place.forEach((location) => displayMarker(location));
      };

      // 지도에 마커를 표시하는 함수입니다
      const displayMarker = (place: LocationDataType) => {
        const marker = new window.kakao.maps.Marker({
          map: kakaoMapRef.current,
          position: new window.kakao.maps.LatLng(place.y, place.x),
        });
        clustererRef.current.addMarker(marker);

        window.kakao.maps.event.addListener(marker, 'click', () =>
          openInfoContent(place),
        );
      };

      const searchOption = {
        useuseMapBounds: true,
        radius: mapRadius,
        location: new window.kakao.maps.LatLng(coord.lat, coord.lng),
        sort: window.kakao.maps.services.SortBy.DISTANCE, // default ACCURACY
      };

      const categoryArr = categoryList
        .filter((category) => category.state)
        .map((category) => category.name);

      categoryArr.forEach((category) => {
        placeRef.current.keywordSearch(category, placesSearchCB, searchOption);
      });

      onClose();
    }, 500);

    return () => clearTimeout(timeout);
  }, [
    addressInput,
    categoryList,
    coord,
    mapRadius,
    mapRef,
    onClose,
    onOpen,
    toastUi,
  ]);

  // 인포윈도우 열기
  const openInfoContent = (place: LocationDataType) => {
    const marker = new window.kakao.maps.Marker({
      map: kakaoMapRef.current,
      position: new window.kakao.maps.LatLng(place.y, place.x),
    });
    clustererRef.current.addMarker(marker);

    infoRef.current.setContent(infoContent(place));
    infoRef.current.open(kakaoMapRef.current, marker);
  };

  // 각 Ref 지정
  useEffect(() => {
    onOpen();
    const options = {
      center: new window.kakao.maps.LatLng(coord.lat, coord.lng), //지도의 중심좌표.
      level: 4,
      scrollwheel: false,
    };
    kakaoMapRef.current = new window.kakao.maps.Map(mapRef.current, options);
    placeRef.current = new window.kakao.maps.services.Places(
      kakaoMapRef.current,
    );
    infoRef.current = new window.kakao.maps.InfoWindow({
      zIndex: 3,
      removable: true,
    });

    // 지도 오른쪽에 줌 컨트롤이 표시되도록 지도에 컨트롤을 추가한다.
    const zoomControl = new window.kakao.maps.ZoomControl();
    kakaoMapRef.current.addControl(
      zoomControl,
      window.kakao.maps.ControlPosition.RIGHT,
    );

    clustererRef.current = new window.kakao.maps.MarkerClusterer({
      map: kakaoMapRef.current,
      gridSize: 35,
      averageCenter: true,
      minLevel: 6,
      disableClickZoom: true,
      styles: [
        {
          width: '53px',
          height: '52px',
          background: 'url(cluster.png) no-repeat',
          color: '#fff',
          textAlign: 'center',
          lineHeight: '54px',
        },
      ],
    });
    onClose();
  }, [coord, mapRadius, mapRef, onClose, onOpen]);

  // 주소 입력으로 좌표검색
  useEffect(() => {
    getCoordByAddress(placeRef.current, addressInput, setCoord, toastUi);
    setCount();
  }, [addressInput]);

  // 내 위치 지도에 표시
  useEffect(() => {
    setMyLocation(kakaoMapRef.current, coord);
    setSpots([]);
  }, [coord]);

  return { spots, openInfoContent, onClickSearchBtn };
};

export default useKakaoMap;

// 내 위치 호출 후 지도에 표시하는 함수
const setMyLocation = (map: any, coord: CoordType) => {
  const imageSrc = '/images/my_location.png'; // 마커이미지의 주소입니다
  const imageSize = new window.kakao.maps.Size(40, 40); // 마커이미지의 크기입니다
  const imageOption = { offset: new window.kakao.maps.Point(20, 40) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

  const markerImage = new window.kakao.maps.MarkerImage(
    imageSrc,
    imageSize,
    imageOption,
  );
  const markerPosition = new window.kakao.maps.LatLng(coord.lat, coord.lng);

  const marker = new window.kakao.maps.Marker({
    position: markerPosition,
    image: markerImage, // 마커이미지 설정
    zIndex: 2,
    title: '내 위치',
  });

  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map);
};

const getCoordByAddress = (
  ps: any,
  addressInput: string,
  update: (value: any) => void,
  toastUi: ({ ...props }: UseToastOptions) => void,
) => {
  if (!addressInput.length) return;
  const geocoder = new window.kakao.maps.services.Geocoder();
  // 1. 주소검색
  geocoder.addressSearch(
    addressInput,
    (data: LoadAddressDataType[], status: string) => {
      if (status === 'OK') {
        update({ lat: Number(data[0].y), lng: Number(data[0].x) });
      } else {
        // 2. 키워드 검색
        ps.keywordSearch(
          addressInput,
          (data: LoadAddressDataType[], status: string) => {
            if (status === 'OK') {
              update({ lat: Number(data[0].y), lng: Number(data[0].x) });
            } else {
              // 3. 둘다 없으면 안내
              toastUi({ title: '결과가 없습니다', status: 'info' });
            }
          },
        );
      }
    },
  );
};

const getDeduplicationArray = (arr: any[]) =>
  arr.filter(
    (arr, index, callback) =>
      index === callback.findIndex((t) => t.id === arr.id),
  );
