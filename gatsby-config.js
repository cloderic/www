const process = require('process');
const { PRIMARY, BACKGROUND } = require('./src/theme/colors');
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
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'data',
        path: `${__dirname}/data`
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
        background_color: rgb(parseToRgb(BACKGROUND)),
        display: `minimal-ui`,
        icon: `data/images/mars.png`
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GA_TRACKING_ID,
        // Anonymize IPs (https://support.google.com/analytics/answer/2763052)
        anonymize: true,
        // Respect do not track
        respectDNT: true
      }
    }
  ]
};
