"use strict";

module.exports = (pages, tag) => {
  const result = [];
  for (const page of pages) {
    if (page.tags.includes(tag)) {
      result.push(page);
    }
  }

  return result;
};
