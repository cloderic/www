import { Helmet } from 'react-helmet';
import lowerCase from 'lodash.lowercase';
import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

function Meta({
  description,
  lang,
  keywords = [],
  title,
  path = '/',
  publicationDate,
  updateDate
}) {
  const { site, data } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
            keywords
            lang
          }
        }
        data: dataYaml {
          social {
            twitter
            card {
              ...SocialCardPicture
            }
          }
        }
      }
    `
  );
  const siteMetadata = site.siteMetadata;
  const social = data.social;

  const pageUrl = path.endsWith('/')
    ? `${siteMetadata.siteUrl}${path}`
    : `${siteMetadata.siteUrl}${path}/`;
  const pageTitle = title
    ? `${title} | ${siteMetadata.title}`
    : siteMetadata.title;
  const pageDescription = description || siteMetadata.description;
  const pageKeywords = [...siteMetadata.keywords, ...keywords]
    // Make everything lowercase
    .map(lowerCase)
    // Remove duplicates
    .filter(
      (keyword, keywordIdx, keywords) =>
        keywords.indexOf(keyword) === keywordIdx
    )
    .join(',');
  const pageLang = lang || siteMetadata.lang;
  const socialCard = {
    url: `${siteMetadata.siteUrl}${social.card.childImageSharp.resize.src}`,
    width: social.card.childImageSharp.resize.width,
    height: social.card.childImageSharp.resize.height,
    mimeType: `image/${social.card.extension}`
  };

  return (
    <Helmet>
      {/* Base metadata */}
      <html lang={pageLang} />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="author" content={siteMetadata.author} />
      <meta name="keywords" content={pageKeywords} />
      {publicationDate && (
        <meta name="date" content={publicationDate.toISOString()} />
      )}
      {updateDate && <meta name="revised" content={updateDate.toISOString()} />}
      <link rel="canonical" href={pageUrl} />
      {/* Open Graph Metadata https://ogp.me/ */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:site_name" content={siteMetadata.title} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={socialCard.url} />
      <meta property="og:image:url" content={socialCard.url} />
      <meta property="og:image:secure_url" content={socialCard.url} />
      <meta property="og:image:alt" content={pageDescription} />
      <meta property="og:image:width" content={socialCard.width} />
      <meta property="og:image:height" content={socialCard.height} />
      <meta property="og:image:type" content={socialCard.mimeType} />
      {/* Twitter specific metadata https://developer.twitter.com/en/docs/tweets/optimize-with-cards/guides/getting-started.html */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={`@${social.twitter}`} />
      <meta name="twitter:creator" content={`@${social.twitter}`} />
    </Helmet>
  );
}

export const query = graphql`
  fragment SocialCardPicture on File {
    childImageSharp {
      resize(width: 1024) {
        height
        src
        width
      }
    }
    extension
  }
`;

export default Meta;
