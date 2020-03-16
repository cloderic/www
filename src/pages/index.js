import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import styled from '@emotion/styled';
import BackgroundImage from 'gatsby-background-image';
import { PRIMARY, SECONDARY, WHITE, BOX_SHADOW } from '../theme/colors';

export const query = graphql`
  query {
    face: file(relativePath: { eq: "images/cloderic-stationf.jpeg" }) {
      childImageSharp {
        fluid(maxWidth: 1500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

const Hero = styled.div`
  display: grid;
  grid-template-columns: [img-left] min-content auto min-content [img-right];
  grid-template-rows: [img-top] 2fr 1fr [img-bottom];
  grid-template-areas:
    '.      .   description'
    'title  .   description';

  @media (min-width: 1000px) {
    grid-template-columns: [img-left] min-content minmax(auto, 750px) [img-right] auto;
    grid-template-rows: [img-top] 2fr 1fr [img-bottom];
    grid-template-areas:
      '.      .   description'
      'title  .   description';
  }

  color: ${WHITE};
  background-color: ${SECONDARY};

  z-index: 10;
  ${BOX_SHADOW}

  .image {
    grid-column-start: img-left;
    grid-column-end: img-right;
    grid-row-start: img-top;
    grid-row-end: img-bottom;
    z-index: 1;

    ${BOX_SHADOW}
  }
  .title {
    padding: 2rem;
    grid-area: title;
    text-align: left;
    color: ${PRIMARY};
    h1 {
      font-size: 3.5em;
      line-height: 0.9em;
      margin 0;
    }
    z-index: 2;
  }
  .description {
    grid-area: description;
    align-self: center;
    justify-self: center;
    border-left: ${WHITE} 4px solid;
    padding: 0 1em;
    margin-left: 1em;
    z-index: 2;
  }
`;

const IndexPage = ({ data }) => (
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
        <h1>Clodéric Mars</h1>
      </div>
      <div className="description">
        <h2>
          Tech&nbsp;Leader
          <br />
          AI&nbsp;Specialist
          <br />
          Public&nbsp;Speaker
          <br />
          <small>based&nbsp;in&nbsp;Paris</small>
        </h2>
        <p>🚧 🚧 🚧</p>
      </div>
    </Hero>
  </Layout>
);

export default IndexPage;
