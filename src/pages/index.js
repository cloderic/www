import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/layout';
import SEO from '../components/seo';

export const query = graphql`
  query {
    face: file(relativePath: { eq: "images/cloderic-stationf.jpeg" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h1>Hello there!</h1>
    <p>🚧🚧🚧</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Img fluid={data.face.childImageSharp.fluid} />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
);

export default IndexPage;
