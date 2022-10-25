import { Button, Flex, IconButton, Input, Show, Text } from '@chakra-ui/react';

import LocationDotIcon from '@components/common/@Icons/System/LocationDot';
import SquarePlusIcon from '@components/common/@Icons/System/SquarePlus';

const LocationWrapper = () => {
  return (
    <Flex
      alignItems={'center'}
      p="8px 16px"
      rounded={'md'}
      boxShadow="lg"
      marginY="1rem"
      bgColor="white"
    >
      <Show below="sm">
        <IconButton
          aria-label={'button'}
          icon={<LocationDotIcon boxSize={'24px'} />}
        />
      </Show>
      <Show above="sm">
        <Button gap="12px" colorScheme={'whiteAlpha'}>
          <LocationDotIcon boxSize={'24px'} />
          <Text textStyle={'md'} color="black">
            내 위치
          </Text>
        </Button>
      </Show>

      <Input variant="unstyled" p="1rem" />
      <IconButton
        aria-label={'button'}
        icon={<SquarePlusIcon boxSize={'24px'} textAlign="center" />}
      />
    </Flex>
  );
};

export default LocationWrapper;
