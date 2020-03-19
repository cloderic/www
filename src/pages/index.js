import React from 'react';
import Layout from '../components/layout';
import { css } from '@emotion/core';
import Meta from '../components/meta';
import { Grid, Tile } from '../components/grid';
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
import Player from '../components/player';

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
        fixed(width: 300) {
          ...GatsbyImageSharpFixed
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
    home: homeYaml {
      podcast {
        content
        audio {
          href
          src
          title
        }
      }
    }
    about: file(relativePath: { eq: "pages/home/about.md" }) {
      fields {
        content
      }
    }
  }
`;

const IndexPage = ({ data }) => {
  const social = data.data.social;
  const podcast = data.home.podcast;
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
        <Grid>
          <Tile
            alternate
            small={{
              top: '-30px',
              colStart: 1,
              colSpan: 5,
              rowStart: 1
            }}
            large={{
              top: '-90px',
              colStart: 3,
              colSpan: 3,
              rowStart: 1,
              rowSpan: 2
            }}
            css={css`
              text-align: justify;
            `}
          >
            <div
              css={css`
                float: right;
                margin-top: calc(-80px - 0.5rem);
                margin-right: calc(-80px - 0.5rem);
                margin-left: 0.5rem;
                margin-bottom: 0.5rem;
                shape-outside: circle();
                clip-path: inset(80px 80px 0 0);
              `}
            >
              <Img fixed={data.mars.childImageSharp.fixed} />
            </div>

            <Markdown content={about} />
          </Tile>
          <Tile
            small={{
              top: '-30px',
              left: '20px',
              colStart: 1,
              colSpan: 4,
              rowStart: 2
            }}
            large={{
              top: '25px',
              left: '-50px',
              right: '-50px',
              colStart: 1,
              colSpan: 2,
              rowStart: 1
            }}
            css={css`
              text-align: justify;
            `}
          >
            <Markdown content={podcast.content} />
            <hr />
            <Player {...podcast.audio} />
          </Tile>
        </Grid>
      </section>
    </Layout>
  );
};

export default IndexPage;
