import React from 'react';
import styled from '@emotion/styled';
import Container from './container';
import Stylesheet from '../theme/stylesheet';
import { WHITE } from '../theme/colors';
import Link from './link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCreativeCommons,
  faCreativeCommonsBy,
  faOsi
} from '@fortawesome/free-brands-svg-icons';

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
      <p>
        <FontAwesomeIcon icon={faCreativeCommons} />{' '}
        <FontAwesomeIcon icon={faCreativeCommonsBy} /> The content on this
        website, of which Clodéric Mars is the author, is licensed under a{' '}
        <Link href="https://creativecommons.org/licenses/by/4.0/">
          Creative Commons Attribution 4.0 International license
        </Link>
        .
      </p>
      <p>
        <FontAwesomeIcon icon={faOsi} /> The sources of this website, of which
        Clodéric Mars is the author, are licensed under a{' '}
        <Link href="https://choosealicense.com/licenses/mit/">MIT License</Link>{' '}
        and are available on{' '}
        <Link href="https://github.com/cloderic/www">Github</Link>.
      </p>
    </Footer>
  </>
);

export default Layout;
