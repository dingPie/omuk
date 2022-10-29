import { RefObject, useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface UseKakaoMapProps {
  mapRef: RefObject<HTMLDivElement>;
  size: number;
  coord: CoordType;
}

const useKakaoMap = ({ mapRef, size, coord }: UseKakaoMapProps) => {
  useEffect(() => {
    if (!mapRef.current) return;

    const options = {
      center: new window.kakao.maps.LatLng(coord.lat, coord.lng), //지도의 중심좌표.
      level: 5, //지도의 레벨(확대, 축소 정도)
    };

    // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
    const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

    // 지도를 생성합니다
    const map = new window.kakao.maps.Map(mapRef.current, options);
    const ps = new window.kakao.maps.services.Places(map);

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    const placesSearchCB = (
      data: LocationDataType[],
      status: 'OK' | string,
      pagination: LocationPaginationType,
    ) => {
      if (pagination.hasNextPage) {
        pagination.nextPage();
      }
      if (status === 'OK') {
        showMarker(data);
      }
    };

    // 마커 데이터를 보여주는 콜백함수입니다.
    const showMarker = (data: LocationDataType[]) => {
      data.forEach((location) => displayMarker(location));
    };

    const searchOption = {
      useMapCenter: true,
      // useMapBounds: true,
      radius: 2000,
    };
    ps.categorySearch('FD6', placesSearchCB, searchOption);
    ps.categorySearch('CE7', placesSearchCB, searchOption);
    ps.keywordSearch('맛집', placesSearchCB);

    // 지도에 마커를 표시하는 함수입니다
    const displayMarker = (place: LocationDataType) => {
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(place.y, place.x),
      });

      // 마커에 클릭이벤트를 등록합니다
      window.kakao.maps.event.addListener(marker, 'click', () => {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            '</div>',
        );
        infowindow.open(map, marker);
      });
    };
  }, [coord, mapRef, size]);
};

export default useKakaoMap;
