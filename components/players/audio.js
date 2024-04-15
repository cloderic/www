'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  PlayIcon,
  PauseIcon,
  ArrowUturnLeftIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/solid';
import Link from '../link';

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

export default function Audio({ href, src, title }) {
  const audioEl = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const play = useCallback(() => {
    audioEl.current.play();
  }, [audioEl, title]);
  const pause = useCallback(() => {
    audioEl.current.pause();
  }, [audioEl, title]);
  const restart = useCallback(() => {
    audioEl.current.currentTime = 0;
    setCurrentTime(0);
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
    setDuration(currentAudioEl.duration);
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
    <div className="flex justify-between items-center py-2 px-6 rounded-full bg-blue text-pink">
      <button
        onClick={playing ? pause : play}
        title={playing ? 'Pause' : 'Play'}
      >
        {playing ? (
          <PauseIcon className="w-8 h-8" />
        ) : (
          <PlayIcon className="w-8 h-8" />
        )}
      </button>
      <span className="duration">
        {formatDuration(currentTime)}&nbsp;/&nbsp;{formatDuration(duration)}
      </span>
      <button
        onClick={restart}
        disabled={currentTime === 0}
        title={'Restart from beginning'}
      >
        <ArrowUturnLeftIcon className="w-8 h-8" />
      </button>
      <Link href={href} title={`Open original source for '${title}'...`}>
        <ArrowTopRightOnSquareIcon className="w-8 h-8 text-pink" />
      </Link>
      <audio ref={audioEl} src={src} crossOrigin>
        <p>
          Your browser does not support the <code>audio</code> element.
        </p>
        <p>
          Check out the original source for '{title}'{' '}
          <Link href={href}>there</Link>
        </p>
      </audio>
    </div>
  );
}
