import dayjs from 'dayjs';

export const getToday =() => {
  let now = dayjs().format("YYYY-MM-DD");
  //console.log(now);
  return now;
};
