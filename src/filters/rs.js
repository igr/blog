"use strict";

const shortNames = {
  1: "jan",
  2: "feb",
  3: "mar",
  4: "apr",
  5: "maj",
  6: "jun",
  7: "jul",
  8: "avg",
  9: "sep",
  10: "okt",
  11: "nov",
  12: "dec",
};

const fullNames = {
  1: "januar",
  2: "februar",
  3: "mart",
  4: "april",
  5: "maj",
  6: "jun",
  7: "juli",
  8: "avgust",
  9: "septembar",
  10: "oktobar",
  11: "novembar",
  12: "decembar"
};

module.exports = {
  dateShort: (dateObj) => {
    const monthName = shortNames[dateObj.getMonth() + 1];
    return monthName + ' ' + dateObj.getDate();
  },
  dateLong: (dateObj) => {
    const monthName = fullNames[dateObj.getMonth() + 1];
    return dateObj.getDate() + '. ' + monthName + ' ' + dateObj.getFullYear();
  }
};
