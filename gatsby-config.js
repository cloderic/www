const process = require('process');

module.exports = {
  siteMetadata: {
    title: `cloderic.com`,
    description: `Clodéric Mars home page`,
    author: `@cloderic`,
    siteURL: 'https://www.cloderic.com'
  },
  plugins: [
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
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'data',
        path: `${__dirname}/data`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `data/images/gatsby-icon.png` // This path is relative to the root of the site.
      }
    }
  ]
};
