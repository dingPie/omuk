import { Box, Flex, Text } from '@chakra-ui/react';

interface ResultPlaceProps {
  resultPlace?: LocationDataType[];
}

const ResultPlace = ({ resultPlace }: ResultPlaceProps) => {
  return (
    <Flex flexDir={'column'} gap="1rem" marginY="1rem">
      <Text marginX={'12px'} textStyle={'xl'} fontWeight="bold" w="100%">
        오늘의 식당
      </Text>
      <Flex
        flexDir={{ base: 'column', sm: 'row' }}
        gap={{ base: '12px' }}
        justifyContent="center"
        // alignItems={'center'}
      >
        {resultPlace &&
          resultPlace.map((data) => <PlaceItem key={data.id} data={data} />)}
        {/* <PlaceItem />
        <PlaceItem />
        <PlaceItem /> */}
      </Flex>
    </Flex>
  );
};
export default ResultPlace;

interface PlaceItemProps {
  data: LocationDataType;
}

const PlaceItem = ({ data }: PlaceItemProps) => {
  return (
    <Flex w="100%" boxShadow="md" rounded={'base'} p="12px" bgColor={'white'}>
      <Flex flexDir={'column'} w="100%">
        <Flex
          gap={'12px'}
          p="4px"
          mb="8px"
          borderBottom={'1px lightgray solid'}
          // alignItems="center"
          justifyContent={'space-between'}
        >
          <Text textStyle={'lg'} fontWeight="bold">
            {data.place_name}
          </Text>
          {/* <Text textStyle={'md'} whiteSpace="nowrap" fontWeight={'700'}>
            {data.category_name}
          </Text> */}
        </Flex>

        <Text textStyle={'sm'}>{data.phone}</Text>
        <Text textStyle={'sm'}>{data.address_name}</Text>
        <Text textStyle={'sm'}>{data.distance} m</Text>
      </Flex>
      <Box
        w="100%"
        maxW={'100px'}
        h="100px"
        maxH={'100px'}
        bgColor="yellow.300"
        borderRadius={'8px'}
        alignSelf="center"
      >
        이미지
      </Box>
    </Flex>
  );
};
