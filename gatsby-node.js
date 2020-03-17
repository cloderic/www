const fs = require('fs');

exports.onCreateNode = ({ node, actions, getNode }) => {
  if (
    node.internal.type === 'File' &&
    node.internal.mediaType.startsWith('text')
  ) {
    // Import content for text file nodes.
    const { createNodeField } = actions;

    const { absolutePath } = node;

    fs.readFile(absolutePath, 'utf8', (err, data) => {
      if (err) throw err;
      console.log(`Creating 'content' fields for file '${absolutePath}'`);
      createNodeField({
        node,
        name: 'content',
        value: data
      });
    });
  }
};
