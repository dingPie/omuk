import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

import { map } from 'lodash';

import {
  Box,
  BoxProps,
  Button,
  Flex,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';

import useAppToast from '@hooks/useAppToast';
import usePageResize from '@hooks/usePageResize';

import Banner from './_fragment/Banner';
import CategoryButtons from './_fragment/CategoryButtons';
import LoadingModal from './_fragment/LoadingModal';
import LocationWrapper from './_fragment/LocationWrapper';
import MenualModal from './_fragment/MenualModal';
import ResultPlace from './_fragment/ResultPlace';
import OptionComponent from './_fragment/unUse/OptionCompent';
import SelectRadius from './_fragment/unUse/SelectRadius';
import useKakaoMap from './useKakaoMap';
import { getCount } from './util/function';
import {
  ADDRESS_KEY,
  CALL_API_COUNT,
  CATEGORY_OBJECT,
} from './util/index.data';

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

  const { toastUi } = useAppToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenMenual,
    onOpen: onOpenMenual,
    onClose: onCloseMenual,
  } = useDisclosure();

  const { size } = usePageResize(boxRef);
  const { spots, openInfoContent, onClickSearchBtn } = useKakaoMap({
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
    if (!spots.length) {
      toastUi({ title: '먼저 주변 매장을 받아와주세요!', status: 'info' });
      return;
    }
    onOpen();
    setTimeout(() => {
      const resultPlace = getRandomItem(spots);
      setResultPlace(resultPlace);
      onClose();
    }, 500);
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

  const onClickResult = (place: LocationDataType) => {
    openInfoContent(place);
    const mapPosition = mapRef.current?.offsetTop;
    window.scrollTo({ top: mapPosition, left: 0, behavior: 'smooth' });
  };

  const onClickGetMyLocation = () => {
    onOpen();
    navigator.geolocation.getCurrentPosition(
      (pos) => getGeocodeToAddress(pos),
      () => toastUi({ title: '위치 허용이 필요합니다!', status: 'error' }),
    );
    onClose();

    const getGeocodeToAddress = async (pos: GeolocationPosition) => {
      const { longitude, latitude } = pos.coords;
      const geocoder = new window.kakao.maps.services.Geocoder();
      await geocoder.coord2Address(
        longitude,
        latitude,
        (data: { address: LocationDataType }[]) => {
          setFindValue(data[0].address.address_name);
        },
      );
    };
  };

  // find value 값이 바뀔떄마다 지도를 검색해준다.
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAddressInput(findValue);
    }, SEARCH_DELAY);
    return () => {
      clearTimeout(timeout);
    };
  }, [findValue]);

  // 첫 mount시, 로컬스토리지에 저장된 주소 설정
  useEffect(() => {
    if (!addressInput.length) return;
    localStorage.setItem(ADDRESS_KEY, addressInput);
  }, [addressInput]);

  // locaStorage 에 저장된 내 주소, api 호출 횟수 가져오기
  useEffect(() => {
    const { count } = getCount();
    console.log('호출횟수', count);
    if (count < 1) onOpenMenual();
    const address = localStorage.getItem(ADDRESS_KEY);
    setAddressInput(address || '서울역');
    setFindValue(address || '서울역');
  }, [onClose, onOpen, onOpenMenual]);

  return (
    <>
      <Flex flexDir={'column'} gap="24px" py="1rem">
        {/* 지도에 맞게 잘 펴지긴 하는데, 지도 구역을 잘 못받아오네 */}
        <Banner onClickOmukBtn={onClickOmukBtn} />

        <Flex flexDir={'column'}>
          <LocationWrapper
            findValue={findValue}
            onChangeAddressInput={onChangeAddressInput}
            onClickGetMyLocation={onClickGetMyLocation}
            onClickSearchBtn={onClickSearchBtn}
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
        <ResultPlace resultPlace={resultPlace} onClickResult={onClickResult} />

        <Flex ref={boxRef} w="100%" h="auto" bgColor={'red.300'}>
          <Box ref={mapRef} w={size} h={size} />
        </Flex>

        <Box marginY="1rem">
          <Flex justifyContent="space-between">
            <Text textStyle={'lg'} fontWeight="700" mb="8px">
              안내
            </Text>
            <Button onClick={onOpenMenual}>매뉴얼 다시보기</Button>
          </Flex>
          <Text> * 위치 정보는 사용자 브라우저에 저장됩니다</Text>
          <Text>
            ** 각 카테고리별 현재 위치에서 가까운 45개의 매장이 표시됩니다.
          </Text>
        </Box>
      </Flex>

      <LoadingModal isOpen={isOpen} onClose={onClose} />
      <MenualModal isOpen={isOpenMenual} onClose={onCloseMenual} />
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
