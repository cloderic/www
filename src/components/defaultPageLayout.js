import Container from './container';
import Layout from './layout';
import Meta from './meta';
import React from 'react';
import styled from '@emotion/styled';
import { BG_COLOR_1_GRADIENT, BOX_SHADOW } from '../theme/colors';

const SectionContainer = styled.section`
  background: ${BG_COLOR_1_GRADIENT};
  z-index: 10;
  ${BOX_SHADOW};
`;

const SectionContainee = styled(Container)`
  padding: 2rem 0.5rem;
`;

const DefaultPageLayout = ({ children, pageContext }) => {
  return (
    <Layout>
      <Meta title={pageContext.frontmatter.title} />
      <SectionContainer>
        <SectionContainee>
          <h1>{pageContext.frontmatter.title}</h1>
          {children}
        </SectionContainee>
      </SectionContainer>
    </Layout>
  );
};

export default DefaultPageLayout;
