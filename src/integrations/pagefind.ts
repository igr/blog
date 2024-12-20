import type {AstroIntegration} from "astro";
import {fileURLToPath} from "node:url";
import {createIndex} from "pagefind";
import * as path from "node:path";
import sirv from "sirv";

export type PagefindOptions = {
  urlPrefix: "/pagefind/";
};

export const pagefind = (options?: PagefindOptions): AstroIntegration => {
  let generate = true;
  let outDir: string;
  return {
    name: 'pagefind',
    hooks: {
      "astro:config:setup": ({config, logger}) => {
        if (config.output === "server") {
          logger.warn(
            "Output type `server` does not produce static *.html pages in its output and thus will not work with astro-pagefind integration.",
          );
          return;
        }
        outDir = fileURLToPath(config.outDir);
      },

      "astro:server:setup": ({server, logger}) => {
        if (!outDir) {
          logger.warn(
            "astro-pagefind couldn't reliably determine the output directory. Search assets will not be served.",
          );
          return;
        }

        const serve = sirv(outDir, {
          dev: true,
          etag: true,
        });
        server.middlewares.use((req, res, next) => {
          if (req.url?.startsWith(options?.urlPrefix || "/pagefind/")) {
            serve(req, res, next);
          } else {
            next();
          }
        });
      },

      "astro:build:done": async ({logger}) => {
        if (!generate) {
          return;
        }
        const {index} = await createIndex();
        if (!index) {
          logger.error("Pagefind failed to create index!");
          return;
        }
        const {page_count, errors: addErrors} = await index.addDirectory({path: outDir});
        if (addErrors.length) {
          logger.error("Pagefind failed to index files!");
          addErrors.forEach((e) => logger.error(e));
          return;
        } else {
          logger.info(`Pagefind indexed ${page_count} pages`);
        }
        const {outputPath, errors: writeErrors} = await index.writeFiles({
          outputPath: path.join(outDir, "pagefind"),
        });
        if (writeErrors.length) {
          logger.error("Pagefind failed to write index");
          writeErrors.forEach((e) => logger.error(e));
          return;
        } else {
          logger.info(`Pagefind wrote index to ${outputPath}`);
        }
      }
    }
  }
}
