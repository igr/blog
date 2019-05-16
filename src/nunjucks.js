"use strict";

const rs = require('./filters/rs');

module.exports = nunjucksEnv => {
  nunjucksEnv
    .addFilter('rsDateShort', rs.dateShort)
    .addFilter('rsDateLong', rs.dateLong)

    .addFilter('filterTags', require('./filters/tags'))
    .addFilter('searchIndex', require('./filters/search'))
    .addFilter('postsOnly', require('./filters/postsOnly'))
  ;
};
