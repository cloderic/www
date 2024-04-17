import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';

import { promises as fs } from 'fs';
import path from 'path';

import * as MdComponents from '../../../components/markdown';
import processFronmatter from './processFrontmatter';

export default async function loadContent(sourceFile) {
  const fullPath = path.join(process.cwd(), sourceFile);
  const source = await fs.readFile(fullPath, {
    encoding: 'utf8'
  });
  const compiledMdx = await compileMDX({
    source,
    components: MdComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [rehypeHighlight],
        format: 'mdx'
      }
    }
  });

  if (compiledMdx.frontmatter) {
    compiledMdx.frontmatter = processFronmatter(compiledMdx.frontmatter);
  }

  return compiledMdx;
}
