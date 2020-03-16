import React from 'react';
import PropTypes from 'prop-types';
import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';
import { CONTAINER_WIDTH } from '../theme/sizes';
import { DARK, WHITE } from '../theme/colors';

import 'normalize.css';
import 'typeface-quicksand';

const Container = styled.div`
  margin: 0 auto;
  max-width: ${CONTAINER_WIDTH}px;
`;

const Main = styled.main``;

const Footer = styled(Container.withComponent('footer'))`
  color: ${WHITE};
  padding: 1rem 0;
`;

const Layout = ({ children }) => (
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
        body {
          background-color: ${DARK};
        }
        a {
          color: inherit;
        }
      `}
    />
    <Main>{children}</Main>
    <Footer>
      © {new Date().getFullYear()}, Built with
      {` `}
      <a href="https://www.gatsbyjs.org">Gatsby</a>
    </Footer>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
