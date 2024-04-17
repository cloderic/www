// This files uses CJS stuff only so that it is loadable from `next.config.js`

const { glob } = require('glob');
const fs = require('fs');
const path = require('path');

const processFronmatter = require('./processFrontmatter');

async function listContent({ parseFrontmatter = false } = {}) {
  const { compileMDX } = await import('next-mdx-remote/rsc');

  return await Promise.all(
    (await glob('app/content/*.mdx')).map(async (filePath) => {
      const slug = path.basename(filePath, '.mdx');
      if (parseFrontmatter) {
        const source = await fs.promises.readFile(filePath, {
          encoding: 'utf8'
        });

        const { frontmatter } = await compileMDX({
          source,
          options: {
            parseFrontmatter: true
          }
        });

        const processedFronmatter = processFronmatter(frontmatter);

        return { ...processedFronmatter, slug, path: filePath };
      }
      return { slug, path: filePath };
    })
  );
}

module.exports = listContent;
