import { CALL_API_COUNT } from './index.data';

export const setCount = () => {
  const count = localStorage.getItem(CALL_API_COUNT);
  if (!count || JSON.parse(count).expire < Date.now()) {
    const date = getNextDay(new Date());
    const newCount = {
      count: 0,
      expire: date,
    };
    localStorage.setItem(CALL_API_COUNT, JSON.stringify(newCount));
  } else {
    const countData = JSON.parse(count);
    countData.count += 1;
    localStorage.setItem(CALL_API_COUNT, JSON.stringify(countData));
  }
};

const getNextDay = (date: Date) => {
  const d = date;
  const dd = d.setDate(d.getDate() + 1);
  const mm = new Date(dd).setMinutes(0);
  const ss = new Date(mm).setSeconds(0);
  return ss;
};

export const getCount = () => {
  const callApiCount = localStorage.getItem(CALL_API_COUNT);
  let state = 'SUCCESS';
  if (callApiCount && JSON.parse(callApiCount).count >= 100) {
    state = 'BAN';
  } else if (callApiCount && JSON.parse(callApiCount).count >= 50) {
    state = 'WARN';
  }
  return {
    count: JSON.parse(callApiCount || '').count,
    state,
  };
};

// 카테고리 필터 (현재안씀)
const getFilteredSpots = (
  spots: LocationDataType[],
  categoryList: { name: string; state: boolean }[],
) => {
  let result: LocationDataType[] = spots;
  categoryList.forEach((category) => {
    if (category.state) {
      result = result.filter((spot) =>
        spot.category_name.includes(category.name),
      );
    }
  });
  return result;
};
