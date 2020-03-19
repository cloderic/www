import React from 'react';
import Layout from '../components/layout';
import Meta from '../components/meta';
import Markdown from '../components/markdown';
import Header from '../components/header';
import { graphql } from 'gatsby';

export const query = graphql`
  query {
    content: file(relativePath: { eq: "pages/404.md" }) {
      fields {
        content
      }
    }
  }
`;

const NotFoundPage = ({ data }) => {
  const content = data.content.fields.content;
  return (
    <Layout>
      <Meta title="404" />
      <Header>
        <Markdown content={content} />
      </Header>
    </Layout>
  );
};

export default NotFoundPage;
