"use strict";

const Spig = require('./spig/spig');

require('require-dir')('./spig/tasks');


// PAGES

Spig
  .on('/**/*.{md,njk}')
  .pageCommon()
  .summary()
  .collect('tags')
  .rename(path => {
    if (path.dirname.startsWith('/posts/')) {
      path.dirname = path.dirname.substr(6);
    }
  })
  .render()
  .applyTemplate()
  .htmlMinify()
;


// IMAGES

Spig
  .on('/**/*.{png,jpg,gif}')
  .imagesCommon()
  .imageMinify()
;

