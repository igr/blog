const { Spig } = require('spignite');

Spig.hello();

const postsToRoot = (path) => {
  if (path.dirname.startsWith('/posts/')) {
    path.dirname = path.dirname.substr(6);
  }
};

// PAGES

Spig
  .on('/**/*.{md,njk}')
  .watchSite()

  ._("PREPARE")
  .pageCommon()
  .readingTime()
  .rename(postsToRoot)
  .tags()

  ._("RENDER")
  .summary()
  .render()
  .applyTemplate()
  .htmlMinify()
;


// IMAGES

Spig
  .on('/**/*.{png,jpg,gif}')

  ._("IMAGES")
  .assetCommon()
  .rename(postsToRoot)
  .imageMinify()
;

Spig
  .on('/index.json')
  ._("RSS")
  .applyTemplate()
;

Spig
  .on(['/index.xml', '/sitemap.xml'])
  ._("SITEMAP")
  .frontmatter()
  .applyTemplate()
;

Spig.run();
