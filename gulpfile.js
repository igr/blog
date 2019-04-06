"use strict";

const Spig = require('./spig/spig');

require('require-dir')('./spig/tasks');

const postsToRoot = (path) => {
  if (path.dirname.startsWith('/posts/')) {
    path.dirname = path.dirname.substr(6);
  }
};

// PAGES

Spig
  .on('/**/*.{md,njk}')
  .pageCommon()
  .collect('tags')
  .rename(postsToRoot)
  .render()
  .applyTemplate()
  .htmlMinify()
;


// IMAGES

Spig
  .on('/**/*.{png,jpg,gif}')
  .imagesCommon()
  .rename(postsToRoot)
  .imageMinify()
;

Spig
  .on('/index.{json,xml}')
  .kick("POST_RENDER")
  .applyTemplate()
;
