import { ChangeEvent } from 'react';

import { Button, Flex, IconButton, Input, Show, Text } from '@chakra-ui/react';

import LocationDotIcon from '@components/common/@Icons/System/LocationDot';
import SearchIcon from '@components/common/@Icons/System/Search';
import SquarePlusIcon from '@components/common/@Icons/System/SquarePlus';

const LocationWrapper = ({
  findValue,
  onChangeAddressInput,
  getGeocodeToAddress,
  onClickSearchBtn,
}: {
  findValue: string;
  onChangeAddressInput: (e: ChangeEvent<HTMLInputElement>) => void;
  getGeocodeToAddress: () => void;
  onClickSearchBtn: () => void;
}) => {
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
          onClick={getGeocodeToAddress}
          aria-label={'button'}
          icon={<LocationDotIcon boxSize={'24px'} />}
        />
      </Show>
      <Show above="sm">
        <Button onClick={getGeocodeToAddress} gap="12px">
          <LocationDotIcon boxSize={'24px'} />
          <Text textStyle={'md'} color="black">
            내 위치
          </Text>
        </Button>
      </Show>

      <Input
        value={findValue}
        onChange={onChangeAddressInput}
        variant="unstyled"
        p="1rem"
      />

      <Show above="sm">
        <Button onClick={onClickSearchBtn} gap="12px">
          <SearchIcon boxSize={'24px'} color="black" textAlign="center" />
          <Text textStyle={'md'} color="black">
            주변 식당
          </Text>
        </Button>
      </Show>

      <Show below="sm">
        <IconButton
          onClick={onClickSearchBtn}
          aria-label={'button'}
          icon={<SearchIcon boxSize={'24px'} textAlign="center" />}
        />
      </Show>
    </Flex>
  );
};

export default LocationWrapper;
