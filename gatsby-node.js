const get = require('lodash.get');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createRedirect } = actions;
  // Creating redirect based on pages frontmatter.redirect_from
  if (node.internal.type === 'SitePage') {
    const pagePath = node.path;
    get(node, 'context.frontmatter.redirect_from', []).forEach(
      (redirectPath) => {
        console.log(
          `Creating redirect from '${redirectPath}' to '${pagePath}'`
        );
        createRedirect({
          fromPath: redirectPath,
          toPath: pagePath,
          isPermanent: true
        });
      }
    );
  }
};
