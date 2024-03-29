import Link from './link';
import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import Img from 'gatsby-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { graphql, useStaticQuery } from 'gatsby';

const StyledLink = styled(Link)`
  display: inline-flex;
  & > .mars {
    margin-inline-start: 0.2em;
    transition: transform 0.3s;
  }

  &:hover > .mars {
    transform: scale(1.2) rotate(-10deg);
  }
`;

const BackHomeLink = () => {
  const { mars } = useStaticQuery(
    graphql`
      query {
        mars: file(relativePath: { eq: "images/mars.png" }) {
          childImageSharp {
            fixed(width: 100) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `
  );
  const fixedImageCfg = useMemo(
    () => ({
      ...mars.childImageSharp.fixed,
      height: '1em',
      width: '1em'
    }),
    [mars]
  );
  return (
    <StyledLink href="/" title="Back to the home page">
      <FontAwesomeIcon icon={faChevronLeft} />
      <Img fixed={fixedImageCfg} className="mars" />
    </StyledLink>
  );
};

export default BackHomeLink;
