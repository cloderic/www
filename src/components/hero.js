import React from 'react';
import styled from '@emotion/styled';
import BackgroundImage from 'gatsby-background-image';
import {
  PRIMARY,
  BG_COLOR_1_GRADIENT,
  WHITE,
  BOX_SHADOW,
  TEXT_SHADOW
} from '../theme/colors';

const S_HERO_MAX_WIDTH = 600;
const M_HERO_MAX_WIDTH = 1000;

const HeroContainer = styled.section`
  display: grid;
  place-items: center center;

  grid-template-columns: [img-left] 1fr 1fr [img-right];
  grid-template-rows: [img-top] 1fr 1fr [img-bottom];
  grid-template-areas:
    '.      description'
    'title  description';

  @media (min-width: ${S_HERO_MAX_WIDTH}px) {
    grid-template-columns: [img-left] min-content auto min-content [img-right];
    grid-template-rows: [img-top] 1fr 1fr [img-bottom];
    grid-template-areas:
      '.      .   description'
      'title  .   description';
  }

  @media (min-width: ${M_HERO_MAX_WIDTH}px) {
    grid-template-columns: [img-left] min-content minmax(auto, 750px) [img-right] auto;
    grid-template-rows: [img-top] 2fr 1fr [img-bottom];
    grid-template-areas:
      '.      .   description'
      'title  .   description';
  }

  // ${TEXT_SHADOW};
  background: ${BG_COLOR_1_GRADIENT};

  z-index: 10;
  position: relative;
  ${BOX_SHADOW};

  .image {
    place-self: stretch stretch;
    grid-column-start: img-left;
    grid-column-end: img-right;
    grid-row-start: img-top;
    grid-row-end: img-bottom;

    position: relative;
    z-index: 1;
    ${BOX_SHADOW};
  }
  .title {
    padding: 1rem;
    @media (min-width: ${S_HERO_MAX_WIDTH}px) {
      padding: 2rem;
    }
    grid-area: title;
    text-align: left;

    color: ${PRIMARY};
    h1 {
      @media (min-width: ${S_HERO_MAX_WIDTH}px) {
        font-size: 4rem;
      }
      line-height: 0.9em;
      margin 0;
    }
    z-index: 2;
  }
  .description {
    grid-area: description;
    padding: 0 0.5em;
    margin: 0.5em 0;

    border-left: ${WHITE} 2px solid;

    @media (min-width: ${S_HERO_MAX_WIDTH}px) {
      border-left-width: 4px;
      padding: 0 1em;
      margin-left: 1em;
    }

    h2 {
      font-size: 1.1rem;
      @media (min-width: ${S_HERO_MAX_WIDTH}px) {
        font-size: 1.5rem;
      }
      line-height: 1em;
      margin 0;
    }

    p.social {
      letter-spacing: 0.5em;
    }

    z-index: 2;
  }
`;

const Hero = ({ fluid, title, children }) => (
  <HeroContainer>
    <BackgroundImage
      className="image"
      style={{
        backgroundPosition: 'left center'
      }}
      Tag="div"
      fluid={fluid}
    />
    <div className="title">
      <h1>
        {title.split(' ').map((word) => (
          <>
            {word}
            <br />
          </>
        ))}
      </h1>
    </div>
    <div className="description">{children}</div>
  </HeroContainer>
);

export default Hero;
