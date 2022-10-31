import { RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';

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
  setFindValue: (address: string) => void;
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
}: UseKakaoMapProps) => {
  const [coord, setCoord] = useState<CoordType>({ lat: 0, lng: 0 }); // 주소를 좌표로 변환해야 함

  const [spots, setSpots] = useState<LocationDataType[]>([]);

  const kakaoMapRef = useRef<any>(null);
  const placeRef = useRef<any>(null);
  const infoRef = useRef<any>(null);
  const clustererRef = useRef<any>(null);

  const reverseGeocode = () => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    navigator.geolocation.getCurrentPosition((pos) => {
      const longitude = pos.coords.longitude;
      const latitude = pos.coords.latitude;
      console.log('현재 위치는 : ' + latitude + ', ' + longitude);
      geocoder.coord2Address(longitude, latitude, (data: any) => {
        console.log(data[0].address.address_name);
        setFindValue(data[0].address.address_name);
      });
    });
  };

  useEffect(() => {
    // navigator.geolocation.getCurrentPosition((pos) => {
    //   const latitude = pos.coords.latitude;
    //   const longitude = pos.coords.longitude;
    //   console.log('현재 위치는 : ' + latitude + ', ' + longitude);
    // });
    reverseGeocode();
  }, []);

  // 각 Ref 지정
  useEffect(() => {
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
  }, [coord.lat, coord.lng, mapRadius, mapRef]);

  // 주소 입력으로 좌표검색
  useEffect(() => {
    getCoordByAddress(placeRef.current, addressInput, setCoord);
  }, [addressInput]);

  // 내 위치 지도에 표시
  useEffect(() => {
    setMyLocation(kakaoMapRef.current, coord);
    setSpots([]);
  }, [coord]);

  // 실행
  useEffect(() => {
    if (
      !mapRef.current ||
      !placeRef.current ||
      !kakaoMapRef.current ||
      !infoRef.current
    )
      return;
    if (!addressInput) return;
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
        showMarker(data);
        setSpots((prev) => getDeduplicationArray([...prev, ...data]));
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

        // 오버레이
        // const overlay = new window.kakao.maps.CustomOverlay({
        //   content: testContent,
        //   map: kakaoMapRef.current,
        //   position: marker.getPosition(),
        // });

        // window.kakao.maps.event.addListener(marker, 'click', function () {
        //   overlay.setMap(kakaoMapRef.current);
        // });
        // overlay.setMap(null);
        // function closeOverlay() {
        //   overlay.setMap(null);
        // }

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
      result = result.filter((spot) =>
        spot.category_name.includes(category.name),
      );
    }
  });
  return result;
};

const getDeduplicationArray = (arr: any[]) =>
  arr.filter(
    (arr, index, callback) =>
      index === callback.findIndex((t) => t.id === arr.id),
  );

const testContent =
  '<div class="wrap" style={{backgroundColor: "white"}}>' +
  '    <div class="info">' +
  '        <div class="title">' +
  '            카카오 스페이스닷원' +
  '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' +
  '        </div>' +
  '        <div class="body">' +
  '            <div class="img">' +
  '                <img src="https://cfile181.uf.daum.net/image/250649365602043421936D" width="73" height="70">' +
  '           </div>' +
  '            <div class="desc">' +
  '                <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>' +
  '                <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>' +
  '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' +
  '            </div>' +
  '        </div>' +
  '    </div>' +
  '</div>';
