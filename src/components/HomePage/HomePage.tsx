import React from 'react';

import { Box, BoxProps, Flex, Show } from '@chakra-ui/react';

import Banner from './_fragment/Banner';
import CategoryButtons from './_fragment/CategoryButtons';
import LocationWrapper from './_fragment/LocationWrapper';
import OptionComponent from './_fragment/OptionCompent';
import ResultPlace from './_fragment/ResultPlace';
import SelectRadius from './_fragment/SelectRadius';

interface HomePageContentProps extends BoxProps {}

function HomePageContent({ ...basisProps }: HomePageContentProps) {
  return (
    <Box {...basisProps}>
      <Banner />
      <ResultPlace />
      <Flex
        flexDir={{ base: 'column', sm: 'row' }}
        gap="24px"
        padding="0 .5rem"
      >
        <Box
          bgColor="gray.300"
          borderRadius="8px"
          w="100%"
          h="auto"
          maxW={'580px'}
          maxH={'580px'}
          marginY="1rem"
        >
          지도
        </Box>

        <Box>
          <LocationWrapper />
          <Show below={'sm'}>
            <OptionComponent />
          </Show>
          <Show above={'sm'}>
            <SelectRadius />
            <CategoryButtons />
          </Show>
        </Box>
      </Flex>
    </Box>
  );
}

export default HomePageContent;
