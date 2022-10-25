import { useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

const CATEGORY_LIST = ['한식', '양식', '중식', '일식', '분식', '디저트'];

const CATEGORY_OBJECT = CATEGORY_LIST.map((value) => ({
  name: value,
  state: true,
}));

const CategoryButtons = () => {
  const [categoryList, setCategoryList] = useState(CATEGORY_OBJECT);
  const onClickCategoryBtn = (name: string) => {
    const obj = categoryList.map((category) =>
      category.name === name
        ? { ...category, state: !category.state }
        : category,
    );
    console.log('확인1', obj);
    console.log(name);
    setCategoryList(obj);
  };

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
      <Flex overflowX="scroll" gap={'1rem'} p="1rem 0">
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
      bgColor={selected ? 'gray.200' : 'gray.100'}
      padding=".75rem 2rem"
      borderRadius={'4px'}
      boxShadow={selected ? 'inset 0px 0px 10px #ccc' : '0px 0px 10px #ccc'}
    >
      {name}
    </Flex>
  );
};
