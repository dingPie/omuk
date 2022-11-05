import { useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

const CATEGORY_LIST = ['한식', '양식', '중식', '일식', '분식'];

const CATEGORY_OBJECT = CATEGORY_LIST.map((value) => ({
  name: value,
  state: false,
}));

interface CategoryButtonsProps {
  categoryList: { name: string; state: boolean }[];
  onClickCategoryBtn: (name: string) => void;
}

const CategoryButtons = ({
  categoryList,
  onClickCategoryBtn,
}: CategoryButtonsProps) => {
  return (
    <Flex
      flexDir={'column'}
      gap=".5rem"
      marginY={'1rem'}
      p="1rem"
      bgColor="white"
      shadow={'md'}
      borderRadius="8px"
    >
      <Text textStyle={'lg'} fontWeight="bold">
        카테고리
      </Text>
      <Flex overflowX="scroll" gap={'1rem'}>
        {categoryList.map((category) => (
          <CategoryButton
            key={category.name}
            name={category.name}
            selected={category.state}
            onClickCategoryBtn={onClickCategoryBtn}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default CategoryButtons;

const CategoryButton = ({
  name,
  selected,
  onClickCategoryBtn,
}: {
  name: string;
  selected: boolean;
  onClickCategoryBtn: (text: string) => void;
}) => {
  return (
    <Flex
      onClick={() => onClickCategoryBtn(name)}
      flex={'0 0 auto'}
      as={'button'}
      textStyle="md"
      fontWeight={'bold'}
      bgColor={selected ? 'gray.300' : 'gray.100'}
      padding=".5rem 2rem"
      borderRadius={'4px'}
      boxShadow={selected ? 'inset 0px 0px 10px #ccc' : '0px 0px 10px #ccc'}
    >
      {name}
    </Flex>
  );
};
