import React from 'react';
import Layout from '../components/layout';
import { css } from '@emotion/core';
import Meta from '../components/meta';
import { Grid, Tile } from '../components/grid';
import Hero from '../components/hero';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from '../components/link';
import Img from 'gatsby-image';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import {
  faTwitter,
  faLinkedinIn,
  faGithub
} from '@fortawesome/free-brands-svg-icons';
import { graphql } from 'gatsby';

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
    about: mdx(frontmatter: { title: { eq: "About" } }) {
      body
    }
    podcast: mdx(fileAbsolutePath: { regex: "/2020-03-04/" }) {
      body
    }
    talk: mdx(fileAbsolutePath: { regex: "/2017-03-09/" }) {
      body
    }
    threeStages: file(
      relativePath: {
        eq: "articles/2020-04-22-the-three-stages-of-explainable-ai/the-three-stages-of-xai.png"
      }
    ) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

const IndexPage = ({ data }) => {
  const social = data.data.social;
  const { about, podcast, talk } = data;
  return (
    <Layout>
      <Meta />
      <Hero fluid={data.face.childImageSharp.fluid} title="Clodéric Mars">
        <h2>
          AI&nbsp;Product&nbsp;Engineer
          <br />
          Tech&nbsp;Leader
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
              bottom: '-30px',
              colStart: 1,
              colSpan: 5,
              rowStart: 1
            }}
            large={{
              top: '-90px',
              bottom: '-90px',
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
            <h2>Hello, there!</h2>
            <MDXRenderer>{about.body}</MDXRenderer>
          </Tile>
          <Tile
            small={{
              top: '-30px',
              bottom: '-30px',
              left: '20px',
              colStart: 1,
              colSpan: 4,
              rowStart: 2
            }}
            large={{
              top: '25px',
              bottom: '25px',
              colStart: 1,
              colSpan: 2,
              rowStart: 1
            }}
            css={css`
              text-align: justify;
            `}
          >
            <h2>Check out this podcast interview about AI</h2>
            <MDXRenderer>{podcast.body}</MDXRenderer>
          </Tile>
          <Tile
            alternate
            small={{
              top: '5px',
              colStart: 2,
              colSpan: 4,
              rowStart: 3
            }}
            large={{
              top: '10px',
              bottom: '10px',
              left: '-20px',
              right: '15px',
              colStart: 1,
              colSpan: 2,
              rowStart: 2,
              rowSpan: 2
            }}
            css={css`
              text-align: justify;
            `}
          >
            <h2>Let's talk about XAI, with Alfred, Batman's butler</h2>
            <MDXRenderer>{talk.body}</MDXRenderer>
          </Tile>
          <Tile
            small={{
              top: '5px',
              colStart: 1,
              colSpan: 5,
              rowStart: 4
            }}
            large={{
              top: '-50px',
              bottom: '-50px',
              // left: '5px',
              right: '10px',
              colStart: 3,
              colSpan: 3,
              rowStart: 3,
              rowSpan: 1
            }}
          >
            <h2>The 3 stages of Explainable AI</h2>
            <Link
              title="The 3 stages of Explainable AI"
              href="/articles/2020-04-22-the-three-stages-of-explainable-ai/"
            >
              <Img fluid={data.threeStages.childImageSharp.fluid} />
            </Link>
            <p>
              <Link
                title="The 3 stages of Explainable AI"
                href="/articles/2020-04-22-the-three-stages-of-explainable-ai/"
              >
                Read the article...
              </Link>
            </p>
          </Tile>
        </Grid>
      </section>
    </Layout>
  );
};

export default IndexPage;
