import React, { useEffect, useRef, useState } from 'react';

import { Box, BoxProps, Flex, Grid, Show, SimpleGrid } from '@chakra-ui/react';

import usePageResize from '@hooks/usePageResize';

import Banner from './_fragment/Banner';
import CategoryButtons from './_fragment/CategoryButtons';
import LocationWrapper from './_fragment/LocationWrapper';
import OptionComponent from './_fragment/OptionCompent';
import ResultPlace from './_fragment/ResultPlace';
import SelectRadius from './_fragment/SelectRadius';
import useKakaoMap from './useKakaoMap';

interface HomePageContentProps extends BoxProps {}

function HomePageContent({ ...basisProps }: HomePageContentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const [coord, setCoord] = useState<CoordType>({ lat: 0, lng: 0 }); // 주소를 좌표로 변환해야 함
  const [mapRadius, setMapRadius] = useState(500); // 200, 500, 1000, 2000, 3000
  const [categories, setCategories] = useState([]); // 카테고리 array

  const { size } = usePageResize(boxRef);
  useKakaoMap({ mapRef, size, coord });

  useEffect(() => {
    const getCoordByAddress = (address: string) => {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(
        address,
        (result: LoadAddressDataType[], status: string) => {
          if (status === 'OK') {
            setCoord({ lat: Number(result[0].y), lng: Number(result[0].x) });
          } else {
            console.log('검색 불가 시 아무것도 없음ㅇ');
          }
        },
      );
    };

    getCoordByAddress('관악구 봉천로 33길 16-3');
  }, []);

  useEffect(() => {
    console.log('좌표확인', coord);
  }, [coord]);

  return (
    <Box {...basisProps}>
      <Banner />
      <ResultPlace />
      <Flex flexDir={'column'} gap="24px" padding="0 .5rem">
        {/* 지도에 맞게 잘 펴지긴 하는데, 지도 구역을 잘 못받아오네 */}
        <Box ref={boxRef} w="100%" h="auto" bgColor={'red.300'}>
          <Box ref={mapRef} w={size} h={size} />
        </Box>

        <Flex flexDir={'column'}>
          <LocationWrapper />

          <Show below={'sm'}>
            <OptionComponent />
          </Show>
          <Show above={'sm'}>
            <SelectRadius />
            <CategoryButtons />
          </Show>
        </Flex>
      </Flex>
    </Box>
  );
}

export default HomePageContent;
