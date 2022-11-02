const CATEGORY_LIST = ['한식', '양식', '중식', '일식', '분식'];

export const CATEGORY_OBJECT = CATEGORY_LIST.map((value) => ({
  name: value,
  state: true,
}));

export const ADDRESS_KEY = '@recent_address';
