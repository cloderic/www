import React from 'react';
import styled from '@emotion/styled';
import Blockcode from './blockcode';
import Footer from './footer';
import Stylesheet from '../theme/stylesheet';
import Link from './link';
import { MDXProvider } from '@mdx-js/react';

const mdxComponents = {
  a: Link,
  pre: ({ children }) => <>{children}</>,
  code: ({ children, className = '' }) => (
    <Blockcode language={className.replace(/language-/, '')}>
      {children}
    </Blockcode>
  )
};

const Main = styled.main``;

const Layout = ({ children }) => (
  <>
    <Stylesheet />
    <Main>
      <MDXProvider components={mdxComponents}>{children}</MDXProvider>
    </Main>
    <Footer />
  </>
);

export default Layout;
