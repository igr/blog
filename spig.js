const { Spig } = require('spignite');

Spig.hello();

function postsToRoot(path) {
  if (path.dirname.startsWith('/posts/')) {
    path.dirname = path.dirname.substr(6);
  }
  else if (path.dirname.startsWith('/en/posts/')) {
    path.dirname = '/en' + path.dirname.substr(9);
  }
}

// PAGES

Spig
  .on('/**/*.{md,njk}')
  .watchSite()

  ._('META')
  .pageMeta()
  .readingTime()
  .tags()
  .summary()

  ._('INIT')
  .pageLinks()
  .rename(postsToRoot)

  ._('RENDER')
  .render()
  .applyTemplate()
  .htmlMinify()
;


// ASSETS

Spig
  .on('/**/*.{png,jpg,gif,pdf}')

  ._('IMAGES')
  .assetLinks()
  .rename(postsToRoot);


Spig
  .on('/index.json')

  // need to execute BEFORE render phase, so we can collect
  // correct URLS and Markdown content.

  ._('RENDER^BEFORE')
  // calling pageMeta so we can have page methods!
  .pageMeta()
  .applyTemplate()
;


Spig
  .on(['/index.xml', '/sitemap.xml'])

  ._('META')
  .frontmatter()

  ._('RENDER^BEFORE')
  .applyTemplate()
;


Spig.run();
