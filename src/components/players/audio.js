import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faUndo,
  faExternalLinkAlt
} from '@fortawesome/free-solid-svg-icons';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';
import Link from '../link';

const AudioContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > * {
    flex 0 0 auto;
  }
  .duration {
    flex 1 1 auto;
    text-align: center;
  }
`;

const formatDuration = (seconds) => {
  let rest = seconds;
  const hours = Math.floor(rest / 3600);
  rest -= hours * 3600;
  const minutes = Math.floor(rest / 60);
  rest -= minutes * 60;
  const roundSeconds = Math.ceil(rest);
  return [hours, minutes, roundSeconds]
    .map((n) => `${n}`.padStart(2, '0'))
    .join(':');
};

const Audio = ({ href, src, title }) => {
  const audioEl = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const play = useCallback(() => {
    audioEl.current.play();
    trackCustomEvent({
      category: 'audio',
      action: 'play',
      label: title
    });
  }, [audioEl, title]);
  const pause = useCallback(() => {
    audioEl.current.pause();
    trackCustomEvent({
      category: 'audio',
      action: 'pause',
      label: title
    });
  }, [audioEl, title]);
  const restart = useCallback(() => {
    audioEl.current.currentTime = 0;
    setCurrentTime(0);
    trackCustomEvent({
      category: 'audio',
      action: 'restart',
      label: title
    });
  }, [audioEl, setCurrentTime, title]);

  useEffect(() => {
    const currentAudioEl = audioEl.current;
    let timeTracker = null;
    const stopTrackingCurrentTime = () => {
      if (timeTracker) {
        clearInterval(timeTracker);
        timeTracker = null;
      }
    };
    const startTrackingCurrentTime = () => {
      stopTrackingCurrentTime();
      timeTracker = setInterval(
        () => setCurrentTime(currentAudioEl.currentTime),
        1000
      );
    };
    const onLoadedMetata = () => setDuration(currentAudioEl.duration);
    currentAudioEl.addEventListener('loadedmetadata', onLoadedMetata);

    const onPlay = () => {
      startTrackingCurrentTime();
      setPlaying(true);
    };
    currentAudioEl.addEventListener('play', onPlay);

    const onPause = () => {
      stopTrackingCurrentTime();
      setPlaying(false);
    };
    currentAudioEl.addEventListener('pause', onPause);

    return () => {
      stopTrackingCurrentTime();
      currentAudioEl.removeEventListener('loadedmetadata', onLoadedMetata);
      currentAudioEl.removeEventListener('play', onPlay);
      currentAudioEl.removeEventListener('pause', onPause);
    };
  }, [audioEl]);

  return (
    <AudioContainer>
      <button
        onClick={playing ? pause : play}
        title={playing ? 'Pause' : 'Play'}
      >
        <FontAwesomeIcon size="2x" icon={playing ? faPause : faPlay} />
      </button>
      <span className="duration">
        {formatDuration(currentTime)}&nbsp;/&nbsp;{formatDuration(duration)}
      </span>
      <button
        onClick={restart}
        disabled={currentTime === 0}
        title={'Restart from beginning'}
      >
        <FontAwesomeIcon icon={faUndo} />
      </button>
      <Link href={href} title={`Open original source for '${title}'...`}>
        <FontAwesomeIcon icon={faExternalLinkAlt} />
      </Link>
      <audio ref={audioEl} src={src} crossorigin>
        <p>
          Your browser does not support the <code>audio</code> element.
        </p>
        <p>
          Check out the original source for '{title}'{' '}
          <Link href={href}>there</Link>
        </p>
      </audio>
    </AudioContainer>
  );
};

export default Audio;
