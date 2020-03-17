import React from 'react';
import styled from '@emotion/styled';
import Container from './container';
import { SECONDARY, BOX_SHADOW } from '../theme/colors';

const SectionContainer = styled.section`
  background-color: ${SECONDARY};
  z-index: 10;
  ${BOX_SHADOW};
`;

const SectionContainee = styled(Container)`
  padding: 2rem 0;
`;

const Section = ({ children }) => (
  <SectionContainer>
    <SectionContainee>{children}</SectionContainee>
  </SectionContainer>
);

export default Section;
