import dayjs from 'dayjs';

export const getToday =() => {
  let now = dayjs().format("YYYY-MM-DD");
  //console.log(now);
  return now;
};

export const showDate = (dt) =>{
  //console.log(dt);
  //console.log(dt.split(" "));
  return dt.split(" ")[0];
};
