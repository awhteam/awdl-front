


export const numberWithCommas = input => {
    return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export const convertDateToJalali= (input) => {
    const JDate = require('jalali-date');
    const jdate = new JDate(new Date(input));
    return jdate.format('dddd DD MMMM YYYY');
  };
  