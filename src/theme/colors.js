const PRIMARY = '#F2622E';
const SECONDARY = '#88A5BF';
const TERTIARY = '#D9B589';
const DARK = 'rgba(29, 37, 38, 1)';
const WHITE = '#FFFFFF';
const BLACK = '#000000';

const BACKGROUND = DARK;

const BOX_SHADOW = `
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2),
    0 4px 6px -2px rgba(0, 0, 0, 0.1)
`;

const TEXT_SHADOW = `
  text-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  svg.svg-inline--fa {
    filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.5));
  }
`;

// Using "legacy" export syntax because it is imported in 'gatsby-config.js'
module.exports = {
  PRIMARY,
  SECONDARY,
  TERTIARY,
  DARK,
  WHITE,
  BLACK,
  BACKGROUND,
  BOX_SHADOW,
  TEXT_SHADOW
};
