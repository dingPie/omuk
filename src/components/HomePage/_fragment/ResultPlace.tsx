import { Box, Flex, Text } from '@chakra-ui/react';

const ResultPlace = () => {
  return (
    <Flex flexDir={'column'} gap="1rem" marginY="1rem">
      <Text marginX={'12px'} textStyle={'xl'} fontWeight="bold" w="100%">
        오늘의 식당
      </Text>
      <Flex
        flexDir={{ base: 'column', sm: 'row' }}
        gap={{ base: '12px' }}
        justifyContent="center"
        alignItems={'center'}
      >
        <PlaceItem />
        <PlaceItem />
        <PlaceItem />
      </Flex>
    </Flex>
  );
};
export default ResultPlace;

const PlaceItem = () => {
  return (
    <Flex w="100%" boxShadow="md" rounded={'base'} p="12px" bgColor={'white'}>
      <Flex flexDir={'column'} w="100%">
        <Text textStyle={'lg'} fontWeight="bold">
          샹그릴라
        </Text>
        <Text textStyle={'md'}>중식</Text>
        <Text textStyle={'sm'}>02-2222-3333</Text>
        <Flex gap={'12px'} alignItems="center">
          <Text textStyle={'sm'}>11:30 ~ 21:00</Text>
          <Text>영업중</Text>
        </Flex>
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
