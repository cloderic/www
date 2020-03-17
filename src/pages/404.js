import React from 'react';
import Layout from '../components/layout';
import Link from '../components/link';
import Meta from '../components/meta';
import Section from '../components/section';

const NotFoundPage = () => (
  <Layout>
    <Meta title="404" />
    <Section>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      <p>
        <Link href="/">Go back to the home page</Link>
      </p>
    </Section>
  </Layout>
);

export default NotFoundPage;
