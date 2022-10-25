import { Button, Flex, HStack, Text, VStack } from '@chakra-ui/react';

const Banner = () => {
  return (
    <VStack marginY="32px" gap={'12px'}>
      <Text textStyle={'title'} whiteSpace="break-spaces" textAlign={'center'}>
        오늘 뭐먹지?
      </Text>
      <Button
        w="100%"
        maxW="480px"
        h={{ base: '72px', sm: '88px' }}
        fontSize={['28px', '32px']}
        fontWeight="bold"
        boxShadow="xl"
        rounded="md"
        bgColor={'white'}
        color="black"
        colorScheme="whiteAlpha"
      >
        OMUK!
      </Button>
    </VStack>
  );
};

export default Banner;
