import { RefObject, useEffect, useRef, useState } from 'react';

import { clearScreenDown } from 'readline';

import { Box } from '@chakra-ui/react';

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
}: UseKakaoMapProps) => {
  const [coord, setCoord] = useState<CoordType>({ lat: 0, lng: 0 }); // 주소를 좌표로 변환해야 함

  const [spots, setSpots] = useState<LocationDataType[]>([]);

  const kakaoMapRef = useRef<any>(null);
  const placeRef = useRef<any>(null);
  const infoRef = useRef<any>(null);
  const clustererRef = useRef<any>(null);

  useEffect(() => {
    const options = {
      center: new window.kakao.maps.LatLng(coord.lat, coord.lng), //지도의 중심좌표.
      level: zoomObject[mapRadius],
    };
    kakaoMapRef.current = new window.kakao.maps.Map(mapRef.current, options);
    placeRef.current = new window.kakao.maps.services.Places(
      kakaoMapRef.current,
    );
    infoRef.current = new window.kakao.maps.InfoWindow({
      zIndex: 3,
      removable: true,
    });

    clustererRef.current = new window.kakao.maps.MarkerClusterer({
      map: kakaoMapRef.current,
      gridSize: 35,
      averageCenter: true,
      minLevel: 6,
      disableClickZoom: true,
      // styles: [
      //   {
      //     width: '53px',
      //     height: '52px',
      //     background: 'url(cluster.png) no-repeat',
      //     color: '#fff',
      //     textAlign: 'center',
      //     lineHeight: '54px',
      //   },
      // ],
    });
  }, [coord.lat, coord.lng, mapRadius, mapRef]);

  useEffect(() => {
    getCoordByAddress(placeRef.current, addressInput, setCoord);
  }, [addressInput]);

  useEffect(() => {
    setMyLocation(kakaoMapRef.current, coord);
    setSpots([]);
  }, [coord]);

  useEffect(() => {
    if (
      !mapRef.current ||
      !placeRef.current ||
      !kakaoMapRef.current ||
      !infoRef.current
    )
      return;
    setSpots([]);
    clustererRef.current.clear();

    const timeout = setTimeout(() => {
      // 키워드 검색 완료 시 호출되는 콜백함수 입니다
      const placesSearchCB = (
        data: LocationDataType[],
        status: 'OK' | string,
        pagination: LocationPaginationType,
      ) => {
        if (status !== 'OK') return;
        const filteredData = getFilteredSpots(data, categoryList);
        showMarker(filteredData);
        setSpots((prev) => [...prev, ...filteredData]);
        pagination.nextPage();
        if (!pagination.hasNextPage) return;
      };

      // 마커 데이터를 보여주는 콜백함수입니다.
      const showMarker = (data: LocationDataType[]) => {
        data.forEach((location) => displayMarker(location));
      };

      // 지도에 마커를 표시하는 함수입니다
      const displayMarker = (place: LocationDataType) => {
        const marker = new window.kakao.maps.Marker({
          map: kakaoMapRef.current,
          position: new window.kakao.maps.LatLng(place.y, place.x),
        });
        clustererRef.current.addMarker(marker);

        window.kakao.maps.event.addListener(marker, 'click', () => {
          infoRef.current.setContent(
            '<div style="padding:5px;font-size:12px;">' +
              place.place_name +
              '</div>',
          );
          infoRef.current.open(kakaoMapRef.current, marker);
        });
      };

      const searchOption = {
        useMapCenter: true,
        radius: mapRadius,
      };

      placeRef.current.categorySearch('FD6', placesSearchCB, searchOption); // 식당, 카페 'CE7'
    }, 200);

    return () => clearTimeout(timeout);
  }, [coord, categoryList, mapRadius, mapRef]);

  return { spots };
};

export default useKakaoMap;

// 내 위치 호출 후 지도에 표시하는 함수
const setMyLocation = (map: any, coord: CoordType) => {
  const imageSrc =
    'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png'; // 마커이미지의 주소입니다
  const imageSize = new window.kakao.maps.Size(40, 40); // 마커이미지의 크기입니다
  const imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

  // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
  const markerImage = new window.kakao.maps.MarkerImage(
    imageSrc,
    imageSize,
    imageOption,
  );
  const markerPosition = new window.kakao.maps.LatLng(coord.lat, coord.lng);

  // 마커를 생성합니다
  const marker = new window.kakao.maps.Marker({
    position: markerPosition,
    image: markerImage, // 마커이미지 설정
    // draggable: true,
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
) => {
  const geocoder = new window.kakao.maps.services.Geocoder();
  geocoder.addressSearch(
    addressInput,
    (data: LoadAddressDataType[], status: string) => {
      if (status === 'OK') {
        update({ lat: Number(data[0].y), lng: Number(data[0].x) });
        return;
      }
    },
  );
  ps.keywordSearch(
    addressInput,
    (data: LoadAddressDataType[], status: string) => {
      if (status === 'OK')
        update({ lat: Number(data[0].y), lng: Number(data[0].x) });
    },
  );
};

// 카테고리 필터
const getFilteredSpots = (
  spots: LocationDataType[],
  categoryList: { name: string; state: boolean }[],
) => {
  let result: LocationDataType[] = spots;
  categoryList.forEach((category) => {
    if (category.state) {
      result = result.filter(
        (spot) => !spot.category_name.includes(category.name),
      );
    }
  });
  return result;
};
