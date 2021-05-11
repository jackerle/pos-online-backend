// export function numberWithCommas(x) {
//     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }

export function numberWithCommas(num) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

//2020-08-03T13:48:16.000
export function dateWithoutTime(datetext) {
    return datetext.substring(8, 10)+"-"+datetext.substring(5, 7)+"-"+datetext.substring(0, 4);
}

//2020-08-03T13:48:16.000
export function timeWithoutDate(datetext) {
    return datetext.substring(11, 19);
}