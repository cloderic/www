const process = require('process');
const { PRIMARY, BG_DARK } = require('./src/theme/colors');
const { rgb, parseToRgb } = require('polished');

const siteMetadata = {
  title: `cloderic.com`,
  description: `Clodéric Mars Portfolio`,
  author: 'Clodéric Mars',
  siteUrl: 'https://www.cloderic.com',
  keywords: ['ai', 'tech', 'public speaking'],
  lang: 'en'
};

module.exports = {
  siteMetadata,
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-yaml`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          default: require.resolve('./src/components/defaultPageLayout.js')
        },
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              quality: 90,
              linkImagesToOriginal: false
            }
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              ignoreFileExtensions: [`png`, `jpg`, `jpeg`]
            }
          }
        ]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'data',
        path: `${__dirname}/src/data`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`
      }
    },
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: siteMetadata.title,
        short_name: siteMetadata.title,
        lang: siteMetadata.lang,
        start_url: `/`,
        theme_color: rgb(parseToRgb(PRIMARY)),
        background_color: rgb(parseToRgb(BG_DARK)),
        display: `minimal-ui`,
        icon: `src/data/images/mars.png`
      }
    },
    `gatsby-plugin-sitemap`,
    'gatsby-plugin-robots-txt',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GA_TRACKING_ID,
        // Anonymize IPs (https://support.google.com/analytics/answer/2763052)
        anonymize: true,
        // Respect do not track
        respectDNT: true
      }
    },
    'gatsby-plugin-meta-redirect' // make sure this is always the last one
  ]
};
