"use strict";

const slugify = require('slugify');

module.exports = (fileRef) => {
  if (fileRef.dir.startsWith('/posts/')) {
    const slug = fileRef.attr('slug');
    if (!slug) {
      let genSlug = slugify(fileRef.attr('title')).toLowerCase();
      genSlug = genSlug.replace(/:/gi, '');
      fileRef.setAttr('slug', genSlug);
    }
  }

  return {
    layout: "post",
    kind: "post",
    sitemap: {
      priority: 1
    }
  };
};
