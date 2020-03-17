import React from 'react';
import Layout from '../components/layout';
import Meta from '../components/meta';
import Markdown from '../components/markdown';
import Section from '../components/section';
import { graphql } from 'gatsby';

export const query = graphql`
  query {
    content: file(relativePath: { eq: "content/404.md" }) {
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
      <Section>
        <Markdown content={content} />
      </Section>
    </Layout>
  );
};

export default NotFoundPage;
