import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

import { Box, BoxProps, Flex, Grid, Show, SimpleGrid } from '@chakra-ui/react';

import usePageResize from '@hooks/usePageResize';

import Banner from './_fragment/Banner';
import CategoryButtons from './_fragment/CategoryButtons';
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
  const [addressInput, setAddressInput] = useState('똑똑한 개발자');
  const [findValue, setFindValue] = useState('');
  const [resultPlace, setResultPlace] = useState<LocationDataType[]>([]);

  const { size } = usePageResize(boxRef);
  const { spots } = useKakaoMap({
    mapRef,
    addressInput,
    mapRadius,
    categoryList,
  });

  // 버튼 누르면 장소중 세개 표시

  useEffect(() => {
    console.log('스팟확인', spots);
  }, [spots]);

  const onClickOmukBtn = () => {
    const test = getRandomItem(spots);
    console.log(test);
    setResultPlace(test);
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
    const test = setTimeout(() => {
      setAddressInput(findValue);
      console.log('검색값', findValue);
    }, 500);
    // 로딩 표시
    return () => {
      clearTimeout(test);
    };
  }, [findValue]);

  return (
    <Box {...basisProps}>
      <Banner onClickOmukBtn={onClickOmukBtn} />
      <ResultPlace resultPlace={resultPlace} />
      <Flex flexDir={'column'} gap="24px" padding="0 .5rem">
        {/* 지도에 맞게 잘 펴지긴 하는데, 지도 구역을 잘 못받아오네 */}

        <Flex flexDir={'column'}>
          <LocationWrapper onChangeAddressInput={onChangeAddressInput} />

          <Show below={'sm'}>
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
          </Show>
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
