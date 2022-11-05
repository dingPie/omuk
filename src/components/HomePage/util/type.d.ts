interface LocationDataType {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string; // 음식점 > 양식 등으로 필터링한다.
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

interface LocationPaginationType {
  current: number;
  first: number;
  hasNextPage: true;
  hasPrevPage: false;
  last: number;
  perPage: number;
  totalCount: number;
  gotoFirst: () => void;
  gotoLast: () => void;
  gotoPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

interface AddressDataType {
  address: JibunAddressDataType;
  road_address: LoadAddressDataType;
  x: string;
  y: string;
}

interface JibunAddressDataType {
  address_name: string;
  b_code: string;
  h_code: string;
  main_address_no: string;
  mountain_yn: 'N' | 'Y';
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_h_name: string;
  region_3depth_name: string;
  sub_address_no: string;
  x: string;
  y: string;
}

interface LoadAddressDataType {
  address_name: string;
  building_name: string;
  main_building_no: '16';
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_h_name: string;
  road_name: string;
  sub_building_no: string;
  underground_yn: 'N' | 'Y';
  x: string;
  y: string;
  zone_no: string;
}

interface CoordType {
  lat: number;
  lng: number;
}
