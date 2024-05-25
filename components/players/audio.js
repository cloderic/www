'use client';

import AudioPlayer from 'react-h5-audio-player';
import clsx from 'clsx';
import Link from '../link';
import {
  PlayIcon,
  ArrowDownTrayIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/solid';
import './audio.css';
import { useCallback, useState } from 'react';
import { sendGAEvent } from '@next/third-parties/google';
import debounce from 'lodash.debounce';

function TrackListItem({
  artist,
  title,
  src,
  href,
  learnMoreHref,
  onSelectTrack,
  current,
  playing
}) {
  return (
    <li className="m-2 flex gap-2 items-center justify-start">
      {current ? (
        <div
          className={clsx(
            'inline align-text-bottom w-5 h-5 text-pink ',
            playing && 'animate-pulse'
          )}
        >
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            <circle cx="12" cy="12" r="11" />
          </svg>
        </div>
      ) : (
        <button onClick={onSelectTrack}>
          <PlayIcon className="inline align-text-bottom w-5 h-5 hover:text-pink" />
        </button>
      )}
      {learnMoreHref != null ? (
        <Link
          href={learnMoreHref}
          title="Learn more about the track"
          className="line-clamp-1 hover:underline"
        >
          {artist ? `${artist} - ` : null}
          {title}
        </Link>
      ) : (
        <div className="line-clamp-1">
          {artist ? `${artist} - ` : null}
          {title}
        </div>
      )}
      <div className="flex-grow" />
      <Link
        href={src}
        title="Download track"
        className="hover:text-pink hover:underline"
      >
        <ArrowDownTrayIcon className="w-4 h-4" />
      </Link>

      {href != null ? (
        <Link
          href={href}
          title="Open original"
          className="hover:text-pink hover:underline"
        >
          <ArrowTopRightOnSquareIcon className="w-4 h-4" />
        </Link>
      ) : null}
    </li>
  );
}

export default function Audio({ tracks, className, ...otherProps }) {
  const [playing, setPlaying] = useState(false);
  const handlePlay = useCallback(() => setPlaying(true), [setPlaying]);
  const handlePause = useCallback(() => setPlaying(false), [setPlaying]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const handlePrevious = useCallback(
    () => setCurrentTrackIndex((index) => Math.max(index - 1, 0)),
    [setCurrentTrackIndex]
  );
  const handleNext = useCallback(
    () =>
      setCurrentTrackIndex((index) => Math.min(index + 1, tracks.length - 1)),
    [setCurrentTrackIndex, tracks]
  );
  const handlePlaying = useCallback(
    debounce(() => {
      sendGAEvent({
        event: 'playing_track',
        title: tracks[currentTrackIndex].title,
        artist: tracks[currentTrackIndex].artist
      });
    }, 500),
    [currentTrackIndex, tracks]
  );
  return (
    <div
      className={clsx(className, 'bg-slate-800 text-slate-300 flex flex-col')}
      {...otherProps}
    >
      <ol className="not-prose">
        {tracks.map((track, index) => (
          <TrackListItem
            key={index}
            current={index === currentTrackIndex}
            playing={index === currentTrackIndex && playing}
            {...track}
            onSelectTrack={() => setCurrentTrackIndex(index)}
          />
        ))}
      </ol>
      <AudioPlayer
        src={tracks[currentTrackIndex].src}
        showJumpControls={false}
        showSkipControls={tracks.length > 1}
        customAdditionalControls={[]}
        onPlay={handlePlay}
        onPause={handlePause}
        onClickPrevious={handlePrevious}
        onClickNext={handleNext}
        onEnded={handleNext}
        onPlaying={handlePlaying}
      />
    </div>
  );
}
