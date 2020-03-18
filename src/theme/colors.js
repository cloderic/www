const { darken, lighten } = require('polished');

const PALETTE = ['#F27830', '#7DB397', '#041A0E', '#88A5BF', '#040F19'];

const WHITE = '#FFFFFF';
const BLACK = '#000000';

const createBgGradient = (color) =>
  `linear-gradient(175deg, ${lighten(0.1, color)}, ${color})`;

const PRIMARY = PALETTE[0];

const BG_DARK = PALETTE[4];
const BG_DARK_GRADIENT = createBgGradient(BG_DARK);

const BG_COLOR_1 = PALETTE[3];
const BG_COLOR_1_GRADIENT = createBgGradient(BG_COLOR_1);

const BG_COLOR_2 = PALETTE[1];
const BG_COLOR_2_GRADIENT = createBgGradient(BG_COLOR_2);

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
  WHITE,
  BLACK,
  BG_DARK,
  BG_DARK_GRADIENT,
  BG_COLOR_1,
  BG_COLOR_1_GRADIENT,
  BG_COLOR_2,
  BG_COLOR_2_GRADIENT,
  BOX_SHADOW,
  TEXT_SHADOW
};
