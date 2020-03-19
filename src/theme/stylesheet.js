import React from 'react';
import { Global, css } from '@emotion/core';
import { PRIMARY, BG_DARK, BG_DARK_GRADIENT, WHITE } from './colors';
import { lighten } from 'polished';
import { config } from '@fortawesome/fontawesome-svg-core';
import { graphql, useStaticQuery } from 'gatsby';

import '@fortawesome/fontawesome-svg-core/styles.css';
import 'normalize.css';
import 'typeface-quicksand';

// Fix the flicking of huge font awesome icons
// cf. https://medium.com/@fabianterh/fixing-flashing-huge-font-awesome-icons-on-a-gatsby-static-site-787e1cfb3a18
config.autoAddCss = false;

const Stylesheet = () => {
  const { pattern } = useStaticQuery(
    graphql`
      query {
        pattern: file(relativePath: { eq: "images/pattern.png" }) {
          childImageSharp {
            fixed(width: 500) {
              src
            }
          }
        }
      }
    `
  );

  return (
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
          font-size: 12pt;

          color: ${WHITE};

          h1 {
            font-weight: 400;
          }
          h2,
          h3,
          h4,
          h5,
          h5 {
            font-weight: inherit;
          }

          strong {
            font-weight: 800;
          }
        }
        body {
          min-height: 100vh;
          background: repeat center / 300px
              url(${pattern.childImageSharp.fixed.src}),
            ${BG_DARK_GRADIENT}, ${BG_DARK};
        }
        a {
          color: inherit;
          &:active,
          &:focus {
            color: ${lighten(0.05, PRIMARY)};
            outline: none;
          }
          &:hover {
            color: ${PRIMARY};
          }
        }
      `}
    />
  );
};

export default Stylesheet;
