'use client';

import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import clsx from 'clsx';
import Link from '../link';
import {
  PlayIcon,
  ArrowDownTrayIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/solid';
import './audio.css';
import { useState } from 'react';

export default function Audio({ tracks }) {
  const [playing, setPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  return (
    <div className="bg-slate-800 text-white flex flex-col">
      <ol className="not-prose">
        {tracks.map(({ title, src, href }, index) => (
          <li key={index} className="m-2 flex gap-2 items-center justify-start">
            {index === currentTrackIndex ? (
              <PlayIcon
                className={clsx(
                  'inline align-text-bottom w-5 h-5 text-pink',
                  playing && 'animate-pulse'
                )}
              />
            ) : (
              <div className="w-5" />
            )}
            <button
              className={clsx(
                'line-clamp-1',
                index !== currentTrackIndex && 'hover:underline'
              )}
              disabled={index === currentTrackIndex}
              onClick={() => setCurrentTrackIndex(index)}
            >
              {title}
            </button>
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
        ))}
      </ol>
      <AudioPlayer
        src={tracks[currentTrackIndex].src}
        showJumpControls={false}
        showSkipControls={tracks.length > 1}
        customAdditionalControls={[]}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onClickPrevious={() =>
          setCurrentTrackIndex((index) => Math.max(index - 1, 0))
        }
        onClickNext={() =>
          setCurrentTrackIndex((index) =>
            Math.min(index + 1, tracks.length - 1)
          )
        }
        onEnded={() =>
          setCurrentTrackIndex((index) =>
            Math.min(index + 1, tracks.length - 1)
          )
        }
      />
    </div>
  );
}
