const { Spig } = require('spignite');
const slugify = require('slugify');

Spig.hello();

function postsToRoot(path) {
  if (path.dirname.startsWith('/posts/')) {
    path.dirname = path.dirname.substr(6);
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
  .do('slug-from-title', fileRef => {
    if (fileRef.dir.startsWith('/posts/')) {
      const slug = fileRef.attr('slug');
      if (!slug) {
        fileRef.setAttr('slug', slugify(fileRef.attr('title')).toLowerCase());
      }
    }
  })
  .pageLinks()
  .rename(postsToRoot)

  ._('RENDER')
  .render()
  .applyTemplate()
  .htmlMinify()
;


// IMAGES

Spig
  .on('/**/*.{png,jpg,gif}')

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
