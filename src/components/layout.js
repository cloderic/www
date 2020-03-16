import React from 'react';
import styled from '@emotion/styled';
import { CONTAINER_WIDTH } from '../theme/sizes';
import Stylesheet from '../theme/stylesheet';
import { WHITE } from '../theme/colors';

const Container = styled.div`
  margin: 0 auto;
  max-width: ${CONTAINER_WIDTH}px;
`;

const Main = styled.main``;

const Footer = styled(Container.withComponent('footer'))`
  color: ${WHITE};
  padding: 1rem 0.25rem;
  font-size: 0.7em;
`;

const Layout = ({ children }) => (
  <>
    <Stylesheet />
    <Main>{children}</Main>
    <Footer>
      © {new Date().getFullYear()}, Built with
      {` `}
      <a href="https://www.gatsbyjs.org">Gatsby</a>
    </Footer>
  </>
);

export default Layout;
