"use strict";

const rs = require('./rs');
const removeMd = require('remove-markdown');

const cleanup = (str) => {
  str = removeMd(str);
  str = str.replace(/\n/g, " ");
  str = str.split(' ').filter(function (str) {
    const word = str.match(/(\w+)/);
    return word && word[0].length > 3;
  }).join(' ');

  return str;
};

module.exports = (pages) => {
  const result = [];

  for (const p of pages) {
    if (p.kind !== "post") {
      continue;
    }
    result.push({
      contents: cleanup(p.content),
      date: rs.dateShort(p.date),
      permalink: p.link,
      title: p.title,
      tags: p.tag
    });
  }

  return JSON.stringify(result);
};
