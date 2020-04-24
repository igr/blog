"use strict";

module.exports = (fileRef) => {
  // set the title slug
  if (fileRef.dir.startsWith('/posts/')) {
    const slug = fileRef.attr('slug');
    if (!slug) {
      fileRef.setAttr('slug', '{{ title }}');
    }
  }

  // set unrelated description
  const cats = fileRef.attr('categories');
  if (cats.indexOf('Unrelated') !== -1) {
    fileRef.setAttr('description',
      "'Unrelated' thoughts provoke to find questions worth answering, about technology, society, and everyday life."
    );
  }
  if (cats.indexOf('Nepovezano') !== -1) {
    fileRef.setAttr('description',
      "'Unrelated' crtice pozivaju da pronađeš pitanja na koje treba dati odgovor, u vezi tehnologija, društva i svakodnevice."
    );
  }


  // layout and kind
  return {
    layout: "post",
    kind: "post",
    sitemap: {
      priority: 1
    }
  };
};
