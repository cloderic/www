import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';

import { promises as fs } from 'fs';
import path from 'path';

import * as MdComponents from '../../../components/markdown';

export default async function loadContent(sourceFile) {
  const fullPath = path.join(process.cwd(), sourceFile);
  const source = await fs.readFile(fullPath, {
    encoding: 'utf8'
  });
  return compileMDX({
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
}
