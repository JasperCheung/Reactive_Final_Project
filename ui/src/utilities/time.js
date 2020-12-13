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

export const convertToArr = (entries) => {
  // [{title,date,id}]
  let ret = [];
  for (let key in entries){
    ret.push(entries[key]);
  }
  return ret;

};
