import React from 'react';
import Container from '../components/container';
import {
  BOX_SHADOW,
  BG_COLOR_1_GRADIENT,
  BG_COLOR_2_GRADIENT
} from '../theme/colors';
import styled from '@emotion/styled';

const GRID_COLUMNS_COUNT = 5;
const GRID_GAP = 20;
const SMALL_MAX_WIDTH = 1000;

const GridContent = styled.div`
  display: grid;
  grid-gap: ${GRID_GAP}px;
  padding: ${GRID_GAP}px 0;
  grid-template-columns: repeat(${GRID_COLUMNS_COUNT}, 1fr);
  grid-auto-rows: auto;
  & > * {
    position: relative;
    z-index: 20;
    ${BOX_SHADOW};
  }
`;

export const Tile = styled.div`
  background: ${({ alternate }) =>
    alternate ? BG_COLOR_2_GRADIENT : BG_COLOR_1_GRADIENT};

  padding: 0.5rem;

  top: ${({ small = {} }) => small.top || 0};
  bottom: ${({ small = {} }) => small.bottom || 0};
  left: ${({ small = {} }) => small.left || 0};
  right: ${({ small = {} }) => small.right || 0};

  grid-column: ${({ small = {} }) =>
    `${small.colStart || 1} / span ${small.colSpan || 1}`};
  grid-row: ${({ small = {} }) =>
    `${small.rowStart || 1} / span ${small.rowSpan || 1}`};

  @media (min-width: ${SMALL_MAX_WIDTH}px) {
    top: ${({ large = {} }) => large.top || 0};
    bottom: ${({ large = {} }) => large.bottom || 0};
    left: ${({ large = {} }) => large.left || 0};
    right: ${({ large = {} }) => large.right || 0};

    grid-column: ${({ large = {} }) =>
      `${large.colStart || 1} / span ${large.colSpan || 1}`};
    grid-row: ${({ large = {} }) =>
      `${large.rowStart || 1} / span ${large.rowSpan || 1}`};
  }
`;

export const Grid = ({ children }) => (
  <Container>
    <GridContent>{children}</GridContent>
  </Container>
);
