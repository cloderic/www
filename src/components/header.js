import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { PRIMARY, WHITE } from '../theme/colors';
import { CONTAINER_WIDTH } from '../theme/sizes';
import { css } from '@emotion/core';

const Header = ({ siteTitle }) => (
  <header
    css={css`
      background-color: ${PRIMARY};
      margin-bottom: 1.45rem;
    `}
  >
    <div
      css={css`
        margin: 0 auto;
        max-width: ${CONTAINER_WIDTH}px;
        padding: 0.5rem 0;
      `}
    >
      <h1>
        <Link
          to="/"
          css={css`
            color: ${WHITE};
            text-decoration: none;
          `}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;
