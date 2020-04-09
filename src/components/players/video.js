import React from 'react';
import ReactPlayer from 'react-player';
import styled from '@emotion/styled';

const VideoContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Video = ({ src }) => (
  <VideoContainer>
    <ReactPlayer url={src} controls light playing />
  </VideoContainer>
);

export default Video;
