import React from 'react';
import groupBy from 'lodash.groupby';
import Layout from '../../components/layout';
import Meta from '../../components/meta';
import Link from '../../components/link';
import Container from '../../components/container';
import { graphql } from 'gatsby';
import { DateTime } from 'luxon';
import styled from '@emotion/styled';
import { BG_COLOR_2_GRADIENT, BOX_SHADOW, WHITE } from '../../theme/colors';

const ListContainer = styled.section`
  background: ${BG_COLOR_2_GRADIENT};
  z-index: 10;
  ${BOX_SHADOW};
`;

const ListContainee = styled(Container)`
  padding: 2rem 0.5rem;
  ul {
    padding: 0;
  }
  li {
    list-style: none;
  }
`;

const Date = styled.time`
  display: inline-block;
  margin: 0.2em 0.2em;
  width: 4ch;
  text-align: center;
  vertical-align: middle;
  border: 1px solid ${WHITE};
`;

export const query = graphql`
  query {
    articles: allSitePage(
      filter: {
        path: { regex: "/^/articles/.+/" }
        context: { frontmatter: { hidden: { ne: true } } }
      }
      sort: { fields: context___frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          path
          context {
            frontmatter {
              title
              date
            }
          }
        }
      }
    }
  }
`;

const ArticlesIndexPage = ({ data }) => {
  const articles = groupBy(
    data.articles.edges.map(({ node }) => {
      const date = DateTime.fromISO(node.context.frontmatter.date);
      return {
        path: node.path,
        title: node.context.frontmatter.title,
        year: date.year,
        date
      };
    }),
    'year'
  );
  const sortedYears = Object.keys(articles).sort((y1, y2) => y2 - y1);
  return (
    <Layout>
      <Meta title="Articles" />
      <ListContainer>
        <ListContainee>
          <h1>Articles</h1>
          {sortedYears.map((year) => (
            <React.Fragment key={year}>
              <h2>{year}</h2>
              <ul>
                {articles[year].map(({ date, title, path }, index) => (
                  <li key={index}>
                    <Date dateTime={date.toISODate()}>
                      {date.toFormat('dd MMM')}
                    </Date>{' '}
                    <Link href={path}>{title}</Link>
                  </li>
                ))}
              </ul>
            </React.Fragment>
          ))}
        </ListContainee>
      </ListContainer>
    </Layout>
  );
};

export default ArticlesIndexPage;
