import React from 'react';
import Layout from '../components/layout';
import Meta from '../components/meta';
import Container from '../components/container';
import Hero from '../components/hero';
import Markdown from '../components/markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from '../components/link';
import Img from 'gatsby-image';
import {
  faTwitter,
  faLinkedinIn,
  faGithub
} from '@fortawesome/free-brands-svg-icons';
import { graphql } from 'gatsby';
import {
  BG_COLOR_1_GRADIENT,
  BG_COLOR_2_GRADIENT,
  BOX_SHADOW
} from '../theme/colors';
import { CONTAINER_WIDTH } from '../theme/sizes';
import styled from '@emotion/styled';

const GRID_COLUMNS_COUNT = 5;
const GRID_SIZE = CONTAINER_WIDTH / GRID_COLUMNS_COUNT;
const GRID_GAP = 20;
const S_MAX_WIDTH = 1000;

const Content = styled.div`
  display: grid;
  grid-gap: ${GRID_GAP}px;
  padding: ${GRID_GAP}px 0;
  grid-template-columns: repeat(${GRID_COLUMNS_COUNT}, 1fr);
  grid-auto-rows: auto;
  & > * {
    position: relative;
    z-index: 20;
    ${BOX_SHADOW};
  }
  .about {
    top: -30px;
    left: 0px;

    grid-column: 1 / span 5;
    grid-row: 1 / span 1;

    @media (min-width: ${S_MAX_WIDTH}px) {
      top: -90px;
      left: 0px;

      grid-column: 3 / span 3;
      grid-row: 1 / span 2;
    }

    background: ${BG_COLOR_2_GRADIENT};

    padding: 1rem;

    text-align: justify;
  }
  .mars {
    top: -35px;
    left: -25%;

    grid-column: 3 / span 2;
    grid-row: 2 / span 1;

    @media (min-width: ${S_MAX_WIDTH}px) {
      top: +25px;
      left: -50px;

      grid-column: 1 / span 2;
      grid-row: 1 / span 1;
    }
    background: ${BG_COLOR_1_GRADIENT};
  }
`;

export const query = graphql`
  query {
    face: file(relativePath: { eq: "images/cloderic-stationf.jpeg" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    mars: file(relativePath: { eq: "images/mars.png" }) {
      childImageSharp {
        fluid(maxWidth: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    data: dataYaml {
      social {
        twitter
        linkedin
        github
      }
    }
    about: file(relativePath: { eq: "content/home/about.md" }) {
      fields {
        content
      }
    }
  }
`;

const IndexPage = ({ data }) => {
  const social = data.data.social;
  const about = data.about.fields.content;
  return (
    <Layout>
      <Meta />
      <Hero fluid={data.face.childImageSharp.fluid} title="Clodéric Mars">
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
          <Link
            title="Contact me on Twitter"
            href={`https://twitter.com/${social.twitter}`}
          >
            <FontAwesomeIcon size="lg" icon={faTwitter} />
          </Link>{' '}
          <Link
            title="Contact me on LinkedIn"
            href={`https://www.linkedin.com/in/${social.linkedin}/`}
          >
            <FontAwesomeIcon size="lg" icon={faLinkedinIn} />
          </Link>{' '}
          <Link
            title="Check my Github page"
            href={`https://github.com/${social.github}`}
          >
            <FontAwesomeIcon size="lg" icon={faGithub} />
          </Link>
        </p>
      </Hero>
      <section>
        <Container>
          <Content>
            <div className="about">
              <Markdown content={about} />
            </div>
            <div className="mars">
              <Img fluid={data.mars.childImageSharp.fluid} />
            </div>
          </Content>
        </Container>
      </section>
    </Layout>
  );
};

export default IndexPage;
