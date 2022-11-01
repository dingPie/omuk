import { Box, Flex, Slide, SlideFade, Text } from '@chakra-ui/react';

interface ResultPlaceProps {
  resultPlace?: LocationDataType[];
  openInfoContent: (place: LocationDataType) => void;
}

const ResultPlace = ({ resultPlace, openInfoContent }: ResultPlaceProps) => {
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
          resultPlace.map((place, idx) => (
            <PlaceItem
              openInfoContent={openInfoContent}
              key={place.id}
              place={place}
              idx={idx}
            />
          ))}
        {/* <PlaceItem />
        <PlaceItem />
        <PlaceItem /> */}
      </Flex>
    </Flex>
  );
};
export default ResultPlace;

interface PlaceItemProps {
  place: LocationDataType;
  idx: number;
  openInfoContent: (place: LocationDataType) => void;
}

const PlaceItem = ({ place, idx, openInfoContent }: PlaceItemProps) => {
  return (
    <SlideFade
      in={true}
      style={{
        width: '100%',
        transition: '0.3s linear',
        transitionDelay: `0.${idx * 3}s`,
      }}
    >
      <Flex
        onClick={() => openInfoContent(place)}
        w="100%"
        boxShadow="md"
        rounded={'base'}
        p="12px"
        bgColor={'white'}
        transition="0.3s all"
      >
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
              {place.place_name}
            </Text>
            {/* <Text textStyle={'md'} whiteSpace="nowrap" fontWeight={'700'}>
            {place.category_name}
          </Text> */}
          </Flex>

          <Text textStyle={'sm'}> {place.address_name}</Text>
          <Flex gap="4px">
            <Text textStyle={'sm'}>내 위치에서</Text>
            <Text textStyle={'sm'} fontWeight="700">
              {' '}
              {place.distance} m
            </Text>
          </Flex>
          <Text textStyle={'sm'}>
            {place.phone || '등록된 전화번호가 없습니다'}{' '}
          </Text>
        </Flex>
      </Flex>
    </SlideFade>
  );
};
