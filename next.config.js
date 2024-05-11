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
      // Removing the certifications page
      {
        source: '/content/certifications',
        destination: '/resume/en#education',
        permanent: true
      },
      ...contentRedirections,
      // 404 caught by the google search console,
      {
        source:
          '/f0ad71a94a5d8babd8aaf747699e2804/GameAIPro2_Chapter20_Hierarchical_Architecture_for_Group_Navigation_Behaviors.pdf',
        destination:
          '/content/2015-06-10-hierarchical-architecture-for-group-navigation-behaviors/GameAIPro2_Chapter20_Hierarchical_Architecture_for_Group_Navigation_Behaviors.pdf',
        permanent: true
      }
    ];
  }
};
