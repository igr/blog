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

module.exports = {
  dateShort: (dateObj) => {
    const monthName = shortNames[dateObj.getMonth() + 1];

    return monthName + ' ' + dateObj.getDate();
  }
};
