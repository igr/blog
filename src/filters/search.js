"use strict";

const rs = require('./rs');
const removeMd = require('remove-markdown');

module.exports = (pages) => {
  const result = [];

  for (const p of pages) {
    if (!p.date) {
      continue;
    }
    result.push({
      contents: removeMd(p.plain),
      date: rs.dateShort(p.date),
      permalink: p.link,
      title: p.title,
      tags: p.tags
    });
  }

  return JSON.stringify(result);
};
