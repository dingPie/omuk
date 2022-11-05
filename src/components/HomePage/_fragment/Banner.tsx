import { Button, Flex, HStack, Text, VStack } from '@chakra-ui/react';

interface BannerProps {
  onClickOmukBtn: () => void;
}

const Banner = ({ onClickOmukBtn }: BannerProps) => {
  return (
    <VStack gap={'12px'} my=".5rem">
      <Button
        onClick={onClickOmukBtn}
        w="100%"
        // maxW="480px"
        h={{ base: '72px', sm: '120px' }}
        fontSize={{ base: '24px', sm: '42px' }}
        fontWeight="bold"
        boxShadow="xl"
        rounded="md"
        bgColor={'white'}
        color="black"
        colorScheme="whiteAlpha"
      >
        {/* OMUK! */}
        오늘 뭐먹지?
      </Button>
    </VStack>
  );
};

export default Banner;
