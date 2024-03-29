import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';

import { promises as fs } from 'fs';
import path from 'path';

import {
  H1,
  H2,
  H3,
  H4,
  P,
  Em,
  Blockquote,
  Pre,
  Code,
  Ul,
  Ol
} from '../../../components/base';
import Link from '../../../components/link';
import Video from '../../../components/players/video';
import Pdf from '../../../components/players/pdf';
import Audio from '../../../components/players/audio';

const components = {
  a: Link,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  blockquote: Blockquote,
  pre: Pre,
  ul: Ul,
  ol: Ol,
  p: P,
  em: Em,
  code: Code,
  Video: Video,
  Pdf: Pdf,
  Audio: Audio
};

export default async function loadContent(sourceFile) {
  const fullPath = path.join(process.cwd(), sourceFile);
  const source = await fs.readFile(fullPath, {
    encoding: 'utf8'
  });
  return compileMDX({
    source,
    components,
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
