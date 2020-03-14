/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import Header from './header';
import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';
import { CONTAINER_WIDTH } from '../theme/sizes';

import 'normalize.css';
import 'typeface-quicksand';

const Container = styled.div`
  margin: 0 auto;
  max-width: ${CONTAINER_WIDTH}px;
  padding: 0.5rem 0;
`;

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Global
        styles={css`
          html {
            // Border box
            *,
            *::before,
            *::after {
              box-sizing: border-box;
            }

            // Base font
            font-family: quicksand;
            font-weight: 300;
            font-size: 14pt;
          }
        `}
      />
      <Header siteTitle={data.site.siteMetadata.title} />
      <Container>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </Container>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
