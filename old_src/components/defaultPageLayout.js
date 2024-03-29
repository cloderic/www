import Container from './container';
import { DateTime } from 'luxon';
import Layout from './layout';
import BackHomeLink from './backHomeLink';
import Meta from './meta';
import React from 'react';
import styled from '@emotion/styled';
import { BG_COLOR_1_GRADIENT, PRIMARY, BOX_SHADOW } from '../theme/colors';

const ArticleContainer = styled.article`
  background: ${BG_COLOR_1_GRADIENT};
  z-index: 10;
  ${BOX_SHADOW};

  p {
    line-height: 1.7;
    font-size: 1.1em;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 500;
  }

  h2,
  h3,
  hr,
  header.articleHeader {
    margin: 2em 0;
    border: none;
    padding-bottom: 0.5em;
    border-bottom: 1px ${PRIMARY} solid;
  }
`;

const ArticleContainee = styled(Container)`
  padding: 2rem 0.5rem;
`;

const DefaultPageLayout = ({ children, pageContext, location }) => {
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
        path={location.pathname}
        updateDate={updateDate && updateDate.toJSDate()}
      />
      <ArticleContainer>
        <ArticleContainee>
          <header className="articleHeader">
            <BackHomeLink />
            <h1>{pageContext.frontmatter.title}</h1>
            {publicationDate && (
              <p>
                <small>
                  Published on{' '}
                  <time dateTime={publicationDate.toISODate()}>
                    {publicationDate.toFormat('yyyy/MM/dd')}
                  </time>
                  .
                </small>
              </p>
            )}
          </header>
          {children}
          <footer className="articleFooter">
            <BackHomeLink />
            {updateDate && (
              <p>
                <small>
                  Last updated on{' '}
                  <time dateTime={updateDate.toISODate()}>
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
