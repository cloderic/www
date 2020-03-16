import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import styled from '@emotion/styled';
import BackgroundImage from 'gatsby-background-image';
import {
  PRIMARY,
  SECONDARY,
  WHITE,
  BOX_SHADOW,
  TEXT_SHADOW
} from '../theme/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from '../components/link';
import {
  faTwitter,
  faLinkedinIn,
  faGithub
} from '@fortawesome/free-brands-svg-icons';

export const query = graphql`
  query {
    face: file(relativePath: { eq: "images/cloderic-stationf.jpeg" }) {
      childImageSharp {
        fluid(maxWidth: 1500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    site {
      siteMetadata {
        social {
          github
          linkedin
          twitter
        }
      }
    }
  }
`;

const S_HERO_MAX_WIDTH = 600;
const M_HERO_MAX_WIDTH = 1000;

const Hero = styled.div`
  display: grid;
  place-items: center center;

  grid-template-columns: [img-left] 1fr 1fr [img-right];
  grid-template-rows: [img-top] 1fr 1fr [img-bottom];
  grid-template-areas:
    '.      .'
    'title  description';

  @media (min-width: ${S_HERO_MAX_WIDTH}px) {
    grid-template-columns: [img-left] min-content auto min-content [img-right];
    grid-template-rows: [img-top] 1fr 1fr [img-bottom];
    grid-template-areas:
      '.      .   description'
      'title  .   description';
  }

  @media (min-width: ${M_HERO_MAX_WIDTH}px) {
    grid-template-columns: [img-left] min-content minmax(auto, 750px) [img-right] auto;
    grid-template-rows: [img-top] 2fr 1fr [img-bottom];
    grid-template-areas:
      '.      .   description'
      'title  .   description';
  }

  color: ${WHITE};
  // ${TEXT_SHADOW};
  background-color: ${SECONDARY};

  z-index: 10;
  ${BOX_SHADOW};

  .image {
    place-self: stretch stretch;
    grid-column-start: img-left;
    grid-column-end: img-right;
    grid-row-start: img-top;
    grid-row-end: img-bottom;
    z-index: 1;

    ${BOX_SHADOW};
  }
  .title {
    padding: 1rem;
    @media (min-width: ${S_HERO_MAX_WIDTH}px) {
      padding: 2rem;
    }
    grid-area: title;
    text-align: left;

    color: ${PRIMARY};
    h1 {
      @media (min-width: ${S_HERO_MAX_WIDTH}px) {
        font-size: 3.5rem;
      }
      line-height: 0.9em;
      margin 0;
    }
    z-index: 2;
  }
  .description {
    grid-area: description;
    padding: 0 0.5em;
    margin: 0.5em 0;

    border-left: ${WHITE} 2px solid;

    @media (min-width: ${S_HERO_MAX_WIDTH}px) {
      border-left-width: 4px;
      padding: 0 1em;
      margin-left: 1em;
    }

    h2 {
      font-size: 1.1rem;
      @media (min-width: ${S_HERO_MAX_WIDTH}px) {
        font-size: 1.5rem;
      }
      line-height: 1em;
      margin 0;
    }

    p.social {
      letter-spacing: 0.5em;
    }

    z-index: 2;
  }
`;

const IndexPage = ({ data }) => {
  const social = data.site.siteMetadata.social;
  return (
    <Layout>
      <SEO title="Home" />
      <Hero>
        <BackgroundImage
          className="image"
          style={{
            backgroundPosition: 'left center'
          }}
          Tag="div"
          backgroundColor={SECONDARY}
          fluid={data.face.childImageSharp.fluid}
        />
        <div className="title">
          <h1>
            Clodéric
            <br />
            Mars
          </h1>
        </div>
        <div className="description">
          <h2>
            Tech&nbsp;Leader
            <br />
            AI&nbsp;Specialist
            <br />
            Public&nbsp;Speaker
            <br />
            <small>humming&nbsp;from&nbsp;Paris</small>
          </h2>
          <p className="social">
            <Link href={`https://twitter.com/${social.twitter}`}>
              <FontAwesomeIcon size="lg" icon={faTwitter} />
            </Link>{' '}
            <Link href={`https://www.linkedin.com/in/${social.linkedin}/`}>
              <FontAwesomeIcon size="lg" icon={faLinkedinIn} />
            </Link>{' '}
            <Link href={`https://github.com/${social.github}`}>
              <FontAwesomeIcon size="lg" icon={faGithub} />
            </Link>
          </p>
        </div>
      </Hero>
    </Layout>
  );
};

export default IndexPage;
