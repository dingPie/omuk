import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

import {
  Box,
  BoxProps,
  Button,
  Flex,
  Grid,
  Show,
  SimpleGrid,
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
import { CATEGORY_OBJECT } from './index.data';
import useKakaoMap from './useKakaoMap';

interface HomePageContentProps extends BoxProps {}

function HomePageContent({ ...basisProps }: HomePageContentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const [mapRadius, setMapRadius] = useState(500); // 200, 500, 1000, 2000, 3000
  const [categoryList, setCategoryList] = useState(CATEGORY_OBJECT);
  const [addressInput, setAddressInput] = useState('');
  const [findValue, setFindValue] = useState('서울역');
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
    const resultPlace = getRandomItem(spots);
    setResultPlace(resultPlace);
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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAddressInput(findValue);
    }, 500);
    // 로딩 표시
    return () => {
      clearTimeout(timeout);
    };
  }, [findValue]);

  // 현재 좌표 불러와서 input창에 세팅해주는 함수

  const getGeocodeToAddress = async () => {
    // 내 위치 호출
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

  // locaStorage 에 저장된 내 주소 가져오기
  useEffect(() => {
    // locaStorage에 저장된 내 위치(마지막 위치 or 목록 정보 가져오기)
  }, [onClose, onOpen]);

  return (
    <>
      <Box {...basisProps}>
        <Banner onClickOmukBtn={onClickOmukBtn} />

        <ResultPlace
          resultPlace={resultPlace}
          openInfoContent={openInfoContent}
        />

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
