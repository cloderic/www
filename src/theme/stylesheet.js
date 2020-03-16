import React from 'react';
import { Global, css } from '@emotion/core';
import { PRIMARY, DARK } from './colors';
import { darken } from 'polished';

import 'normalize.css';
import 'typeface-quicksand';

const Stylesheet = () => (
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
        &:active {
          color: ${PRIMARY};
        }
        &:hover {
          color: ${darken(0.1, PRIMARY)};
        }
      }
    `}
  />
);

export default Stylesheet;
