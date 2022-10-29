import { useState } from 'react';

import { Flex, Select, Text } from '@chakra-ui/react';

const RADIUS_LIST = [0.5, 1, 2, 3];

const SelectRadius = () => {
  const [radiusValue, setRadiusValue] = useState(0.5);
  //   TODO: 추가한 즐겨찾기 목록 추가 useEffect
  const [myLocationList, setMyLocationList] = useState(['없음']);

  return (
    <Flex flexDir={{ base: 'column', sm: 'row' }} gap="1rem">
      <Flex
        shadow={'md'}
        borderRadius="md"
        alignItems={'center'}
        p=".5rem"
        w="100%"
        bgColor="white"
      >
        <Text w="50%" textAlign={'center'} fontWeight="700">
          여기는
        </Text>
        <Select
          w="100%"
          value={radiusValue}
          onChange={(e) => setRadiusValue(Number(e.target.value))}
          variant={'unstyled'}
          padding={'.5rem 1rem'}
          textAlign="center"
          fontWeight="700"
        >
          {myLocationList.map((radius) => (
            <option key={radius} value={radius}>
              {radius}
            </option>
          ))}
        </Select>
      </Flex>

      <Flex
        shadow={'md'}
        borderRadius="md"
        alignItems={'center'}
        p=".5rem"
        w="100%"
        bgColor="white"
      >
        <Text w="100%" textAlign={'center'} fontWeight="700">
          내 주위
        </Text>
        <Select
          w="100%"
          value={radiusValue}
          onChange={(e) => setRadiusValue(Number(e.target.value))}
          variant={'unstyled'}
          padding={'.5rem 1rem'}
          textAlign="center"
          fontWeight="700"
        >
          {RADIUS_LIST.map((radius) => (
            <option key={radius} value={radius}>
              {radius}
            </option>
          ))}
        </Select>
        <Text w="60%" textAlign={'center'} fontWeight="700">
          KM
        </Text>
      </Flex>
    </Flex>
  );
};

export default SelectRadius;
