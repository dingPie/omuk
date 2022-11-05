import { ChangeEvent } from 'react';

import { Button, Flex, IconButton, Input, Show, Text } from '@chakra-ui/react';

import LocationDotIcon from '@components/common/@Icons/System/LocationDot';
import SearchIcon from '@components/common/@Icons/System/Search';
import SquarePlusIcon from '@components/common/@Icons/System/SquarePlus';

const LocationWrapper = ({
  findValue,
  onChangeAddressInput,
  onClickGetMyLocation,
  onClickSearchBtn,
}: {
  findValue: string;
  onChangeAddressInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickGetMyLocation: () => void;
  onClickSearchBtn: () => void;
}) => {
  return (
    <Flex gap="1rem" alignItems={'center'}>
      <Flex
        p=".5rem 1rem"
        rounded={'md'}
        boxShadow="lg"
        bgColor="white"
        w="100%"
      >
        <Show below="sm">
          <IconButton
            onClick={onClickGetMyLocation}
            aria-label={'button'}
            icon={<LocationDotIcon boxSize={'32px'} />}
          />
        </Show>
        <Show above="sm">
          <Button onClick={onClickGetMyLocation} gap="12px">
            <LocationDotIcon boxSize={'32px'} />
            <Text textStyle={'md'} color="black">
              내 위치
            </Text>
          </Button>
        </Show>

        <Input
          placeholder="주소 또는 키워드를 입력하세요!"
          value={findValue}
          onChange={onChangeAddressInput}
          variant="unstyled"
          p=".5rem 1rem"
        />
      </Flex>

      <Button
        onClick={onClickSearchBtn}
        gap="12px"
        boxShadow="lg"
        bgColor="white"
        p="1.75rem 2rem"
      >
        <SearchIcon boxSize={'32px'} color="black" textAlign="center" />
        <Text textStyle={'md'} color="black">
          내 주변식당
        </Text>
      </Button>
    </Flex>
  );
};

export default LocationWrapper;
