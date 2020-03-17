import Link from './link';
import markdown from 'remark-parse';
import React from 'react';
import rehype2react from 'rehype-react';
import remark2rehype from 'remark-rehype';
import unified from 'unified';

// Let's create a markdown compiler using unified
// -- cf. https://github.com/unifiedjs/unified
const processor = unified()
  // Step 1: Parsing the markdown using remark
  // -- cf. https://github.com/remarkjs/remark
  .use(markdown)
  // Step 2: Removing the surrounding paragraph step
  .use(() => (ast) => {
    // If the root has only one children that is a paragraph we remove it from the ast.
    if (
      ast.children &&
      ast.children.length === 1 &&
      ast.children[0].type === 'paragraph'
    ) {
      ast.children = ast.children[0].children;
    }
    return ast;
  })
  // Step 3: Converting to the 'rehype' internal format
  // -- cf. https://github.com/rehypejs/rehype
  .use(remark2rehype)
  // Step 4: Converting to React components w/o a surrounding <div/>
  .use(rehype2react, {
    createElement: React.createElement,
    Fragment: React.Fragment, // Telling the script that it should return a Fragment to avoid a surrounding <div/>
    components: {
      a: Link // Telling the script to use our custom `Link` component
    }
  });

const Markdown = ({ content = '' }) => processor.processSync(content).contents;

export default Markdown;
