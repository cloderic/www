import Container from './container';
import { DateTime } from 'luxon';
import Layout from './layout';
import Meta from './meta';
import React from 'react';
import styled from '@emotion/styled';
import { BG_COLOR_1_GRADIENT, BOX_SHADOW } from '../theme/colors';

const ArticleContainer = styled.article`
  background: ${BG_COLOR_1_GRADIENT};
  z-index: 10;
  ${BOX_SHADOW};
`;

const ArticleContainee = styled(Container)`
  padding: 2rem 0.5rem;
`;

const DefaultPageLayout = ({ children, pageContext }) => {
  const publicationDate =
    pageContext.frontmatter.date &&
    DateTime.fromISO(pageContext.frontmatter.date);
  const updateDate =
    pageContext.frontmatter.last_update &&
    DateTime.fromISO(pageContext.frontmatter.last_update);
  return (
    <Layout>
      <Meta
        title={pageContext.frontmatter.title}
        publicationDate={publicationDate && publicationDate.toJSDate()}
        updateDate={updateDate && updateDate.toJSDate()}
      />
      <ArticleContainer>
        <ArticleContainee>
          <header>
            <h1>{pageContext.frontmatter.title}</h1>
            {publicationDate && (
              <p>
                <small>
                  Published on{' '}
                  <time datetime={publicationDate.toISODate()}>
                    {publicationDate.toFormat('yyyy/MM/dd')}
                  </time>
                  .
                </small>
              </p>
            )}
          </header>
          {children}
          <footer>
            {updateDate && (
              <p>
                <small>
                  Last updated on{' '}
                  <time datetime={updateDate.toISODate()}>
                    {updateDate.toFormat('yyyy/MM/dd')}
                  </time>
                  .
                </small>
              </p>
            )}
          </footer>
        </ArticleContainee>
      </ArticleContainer>
    </Layout>
  );
};

export default DefaultPageLayout;
