import { Flex, Text } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

import MenuIcon from '@components/common/@Icons/System/Menu';

import { LAYOUT } from '@constants/layout';

import HomeHeaderDrawer from './_fragments/HomeHeaderDrawer';

interface HomeHeaderProps {}

const HomeHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        as="header"
        px={{ base: '16px', md: '80px' }}
        alignItems="center"
        justifyContent="space-between"
        position="fixed"
        zIndex="sticky"
        transition="all 0.3s"
        w="100%"
        h={LAYOUT.HEADER.HEIGHT}
        borderBottom="1px lightgray solid"
        bgColor={'gray.100'}
      >
        <Text textStyle={'title'}>OMUK</Text>
        {/* <MenuIcon cursor={'pointer'} onClick={onOpen} /> */}
      </Flex>
      <HomeHeaderDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default HomeHeader;
