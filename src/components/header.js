import React from 'react';
import styled from '@emotion/styled';
import Container from './container';
import { BG_COLOR_1_GRADIENT, BOX_SHADOW } from '../theme/colors';

const SectionContainer = styled.section`
  background: ${BG_COLOR_1_GRADIENT};
  z-index: 10;
  ${BOX_SHADOW};
`;

const SectionContainee = styled(Container)`
  padding: 2rem 0.5rem;
`;

const Section = ({ children }) => (
  <SectionContainer>
    <SectionContainee>{children}</SectionContainee>
  </SectionContainer>
);

export default Section;
