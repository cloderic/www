'use client';

import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import clsx from 'clsx';
import { DownloadLink, OriginalLink } from './mediaPlayer';
import { PlayIcon } from '@heroicons/react/24/solid';
import './audio.css';
import { useState } from 'react';

export default function Audio({ href, src, title }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="bg-slate-800 text-white flex flex-col">
      <div className="m-2 italic line-clamp-1">
        <PlayIcon
          className={clsx(
            'inline align-text-bottom w-5 h-5 text-pink',
            playing && 'animate-pulse'
          )}
        />{' '}
        {title}
      </div>
      <AudioPlayer
        src={src}
        customAdditionalControls={[RHAP_UI.VOLUME]}
        customVolumeControls={[
          <div className="flex flex-col">
            <DownloadLink href={src} className="text-white" />
            <OriginalLink href={href} className="text-white" />
          </div>
        ]}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
    </div>
  );
}
