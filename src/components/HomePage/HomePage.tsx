import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

import {
  Box,
  BoxProps,
  Button,
  Flex,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import usePageResize from '@hooks/usePageResize';

import Banner from './_fragment/Banner';
import CategoryButtons from './_fragment/CategoryButtons';
import LoadingModal from './_fragment/LoadingModal';
import LocationWrapper from './_fragment/LocationWrapper';
import OptionComponent from './_fragment/OptionCompent';
import ResultPlace from './_fragment/ResultPlace';
import SelectRadius from './_fragment/SelectRadius';
import { ADDRESS_KEY, CATEGORY_OBJECT } from './index.data';
import useKakaoMap from './useKakaoMap';

const SEARCH_DELAY = 1000;

interface HomePageContentProps extends BoxProps {}

function HomePageContent({ ...basisProps }: HomePageContentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const [mapRadius, setMapRadius] = useState(500); // 200, 500, 1000, 2000, 3000
  const [categoryList, setCategoryList] = useState(CATEGORY_OBJECT);
  const [addressInput, setAddressInput] = useState('');
  const [findValue, setFindValue] = useState('');
  const [resultPlace, setResultPlace] = useState<LocationDataType[]>([]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { size } = usePageResize(boxRef);
  const { spots, openInfoContent } = useKakaoMap({
    mapRef,
    addressInput,
    mapRadius,
    categoryList,
    setFindValue,
    onOpen,
    onClose,
  });

  // 버튼 누르면 장소중 세개 표시

  const onClickOmukBtn = () => {
    if (!spots.length) return;
    onOpen();
    setTimeout(() => {
      const resultPlace = getRandomItem(spots);
      setResultPlace(resultPlace);
      onClose();
    }, 1000);
  };

  const onClickCategoryBtn = (name: string) => {
    const obj = categoryList.map((category) =>
      category.name === name
        ? { ...category, state: !category.state }
        : category,
    );
    setCategoryList(obj);
  };

  const onChangeAddressInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFindValue(e.target.value);
  };

  const onChangeMapRadius = (e: ChangeEvent<HTMLSelectElement>) => {
    setMapRadius(Number(e.target.value));
  };

  const onClickResult = (place: LocationDataType) => {
    openInfoContent(place);
    const mapPosition = mapRef.current?.offsetTop;
    console.log(mapPosition);
    window.scrollTo({ top: mapPosition, left: 0, behavior: 'smooth' });
  };

  const getGeocodeToAddress = async () => {
    onOpen();
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { longitude, latitude } = pos.coords;
      // 내 위치(좌표) -> 주소 리버스 지오코드 실행
      const geocoder = new window.kakao.maps.services.Geocoder();
      await geocoder.coord2Address(
        longitude,
        latitude,
        (data: { address: LocationDataType }[]) => {
          setFindValue(data[0].address.address_name);
        },
      );
      onClose();
    });
  };

  // find value 값이 바뀔떄마다
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAddressInput(findValue);
    }, SEARCH_DELAY);
    // 로딩 표시
    return () => {
      clearTimeout(timeout);
    };
  }, [findValue]);

  // 첫 mount시, 로컬스토리지에 저장된 주소 설정
  useEffect(() => {
    if (!addressInput.length) return;
    localStorage.setItem(ADDRESS_KEY, addressInput);
  }, [addressInput]);

  // locaStorage 에 저장된 내 주소 가져오기
  useEffect(() => {
    const address = localStorage.getItem(ADDRESS_KEY);
    setAddressInput(address || '서울역');
    setFindValue(address || '서울역');
  }, [onClose, onOpen]);

  return (
    <>
      <Box {...basisProps}>
        <Banner onClickOmukBtn={onClickOmukBtn} />

        <ResultPlace resultPlace={resultPlace} onClickResult={onClickResult} />

        <Flex flexDir={'column'} gap="24px" padding="0 .5rem">
          {/* 지도에 맞게 잘 펴지긴 하는데, 지도 구역을 잘 못받아오네 */}

          <Flex flexDir={'column'}>
            <LocationWrapper
              findValue={findValue}
              onChangeAddressInput={onChangeAddressInput}
              getGeocodeToAddress={getGeocodeToAddress}
            />

            <CategoryButtons
              categoryList={categoryList}
              onClickCategoryBtn={onClickCategoryBtn}
            />
            {/* 초기 기획과 달라져서 현재 사용하지 못하는 부분 */}
            {/* <Show below={'sm'}>
            <OptionComponent
              onChangeMapRadius={onChangeMapRadius}
              categoryList={categoryList}
              onClickCategoryBtn={onClickCategoryBtn}
            />
          </Show>
          <Show above={'sm'}>
            <SelectRadius onChangeMapRadius={onChangeMapRadius} />
            <CategoryButtons
              categoryList={categoryList}
              onClickCategoryBtn={onClickCategoryBtn}
            />
          </Show> */}
          </Flex>

          <Flex
            flexDir={{ base: 'column', sm: 'row' }}
            ref={boxRef}
            w="100%"
            h="auto"
            bgColor={'red.300'}
          >
            <Box ref={mapRef} w={size} h={size} />
          </Flex>

          <Box my="1rem">
            <Text textStyle={'lg'} fontWeight="700" mb="8px">
              안내
            </Text>
            <Text> * 위치 정보는 사용자 브라우저에 저장됩니다</Text>
            <Text>
              ** 각 카테고리별 현재 위치에서 가까운 45개의 매장이 표시됩니다.
            </Text>
          </Box>
        </Flex>
      </Box>
      <LoadingModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default HomePageContent;

const getRandomItem = (data: any[]) => {
  const arr = new Array(data.length).fill(true).map((_, i) => i);
  const result = [];
  for (let i = 0; i < 3; i++) {
    const target = arr.splice(Math.floor(Math.random() * arr.length), 1);
    result.push(data[target[0]]);
  }
  return result;
};
