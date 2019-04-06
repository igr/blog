"use strict";

module.exports = (pages) => {
  const result = [];

  for (const p of pages) {
    if (!p.date) {
      continue;
    }
    result.push(p);
  }

  return result;
};
