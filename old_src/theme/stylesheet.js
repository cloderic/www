import React from 'react';
import { Global, css } from '@emotion/core';
import { PRIMARY, BG_DARK, BG_DARK_GRADIENT, WHITE } from './colors';
import { lighten, transparentize } from 'polished';
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
          @media print {
            font-size: 9pt;
          }

          color: ${WHITE};

          h1 {
            font-weight: 400;
            @media print {
              font-weight: 500;
            }
            page-break-after: "";
          }
          h2,
          h3,
          h4,
          h5,
          h5 {
            font-weight: inherit;
            @media print {
              font-weight: 400;
            }
            page-break-after: "";
          }
          .anchor {
            fill: ${WHITE};
            width: 20px;
            margin-right: 5px;
            margin-left: -25px;
            svg {
              visibility: hidden;
            }
            &:hover svg {
              visibility: visible;
            }
          }

          header {
            h1,
            h2,
            h3,
            h4,
            h5,
            h5,
            p {
              margin 0.1em 0;
            }
            margin 2em 0;
          }

          strong {
            font-weight: 800;
          }

          blockquote {
            padding-left: 0.5em;
            font-style: italic;
            border-left: 0.2em solid ${transparentize(0.5, PRIMARY)};

            margin-block-start: 1em;
            margin-block-end: 1em;
            margin-inline-start: 0;
            margin-inline-end: 0;
          }
        }
        body {
          min-height: 100vh;
          background: repeat center / 300px
              url(${pattern.childImageSharp.fixed.src}),
            ${BG_DARK_GRADIENT}, ${BG_DARK};
        }
        a,
        button {
          color: inherit;
          cursor: pointer;
          background: none;
          border: none;
          &:active,
          &:focus {
            color: ${lighten(0.05, PRIMARY)};
            outline: none;
          }
          &:hover {
            color: ${PRIMARY};
          }
          &:disabled {
            color: ${transparentize(0.5, WHITE)};
            &:hover {
              cursor: not-allowed;
            }
          }
        }
        hr {
          border: 0.5px ${WHITE} solid;
        }
      `}
    />
  );
};

export default Stylesheet;
