import React from 'react';
import styled from '@emotion/styled';
import Container from './container';
import { WHITE } from '../theme/colors';
import Link from './link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCreativeCommons,
  faCreativeCommonsBy,
  faOsi
} from '@fortawesome/free-brands-svg-icons';

const FooterContainer = styled(Container.withComponent('footer'))`
  color: ${WHITE};
  padding-top: 1rem;
  padding-bottome: 1rem;
  nav {
    display: flex;
    justify-content: center;
    ul {
      display: flex;
      padding: 0;
      li {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
        margin-left: 1em;
        display block;
        list-style: none;
        &:after {
          content: "•";
          margin-left: 1em;
        }
        &:last-child:after {
          content: none;
        }
      }
    }
  }
  .license {
    font-size: 0.7em;
  }
`;

const Footer = () => (
  <FooterContainer>
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/articles">Articles</Link>
        </li>
      </ul>
    </nav>
    <p className="license">
      <FontAwesomeIcon icon={faCreativeCommons} />{' '}
      <FontAwesomeIcon icon={faCreativeCommonsBy} /> The content on this
      website, of which Clodéric Mars is the author, is licensed under a{' '}
      <Link href="https://creativecommons.org/licenses/by/4.0/">
        Creative Commons Attribution 4.0 International license
      </Link>
      .
    </p>
    <p className="license">
      <FontAwesomeIcon icon={faOsi} /> The sources of this website, of which
      Clodéric Mars is the author, are licensed under a{' '}
      <Link href="https://choosealicense.com/licenses/mit/">MIT License</Link>{' '}
      and are available on{' '}
      <Link href="https://github.com/cloderic/www">Github</Link>.
    </p>
  </FooterContainer>
);

export default Footer;
