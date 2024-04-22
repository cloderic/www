const listContent = require('./app/content/utils/listContent');

module.exports = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'http.cat',
        port: '',
        pathname: '/*'
      }
    ]
  },
  async redirects() {
    const contentRedirections = (await listContent({ parseFrontmatter: true }))
      .filter(
        ({ redirect_from }) => redirect_from != null && redirect_from.length > 0
      )
      .map(({ slug, redirect_from }) =>
        redirect_from.map((source) => ({
          source,
          destination: `/content/${slug}`,
          permanent: true
        }))
      )
      .flat();

    return [
      // /articles to /content
      {
        source: '/articles',
        destination: '/content',
        permanent: true
      },
      {
        source: '/articles/:slug',
        destination: '/content/:slug',
        permanent: true
      },
      // Default resume is english
      {
        source: '/resume',
        destination: '/resume/en',
        permanent: true
      },
      ...contentRedirections
    ];
  }
};
