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

  ._("PREPARE")
  .pageCommon()
  .readingTime()
  .rename(postsToRoot)
  .collect('tags')

  ._("RENDER")
  .summary()
  .render()
  .applyTemplate()
  .htmlMinify()
;


// IMAGES

Spig
  .on('/**/*.{png,jpg,gif}')
  ._("PREPARE")
  .assetCommon()
  .rename(postsToRoot)

  ._("IMGS")
  .imageMinify()
;

Spig
  .on('/index.json')
  ._("POST_RENDER")
  .applyTemplate()
;

Spig
  .on(['/index.xml', '/sitemap.xml'])
  ._("POST_RENDER")
  .frontmatter()
  .applyTemplate()
;
