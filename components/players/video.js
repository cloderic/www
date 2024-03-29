'use client';

import Link from '../link';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { PlayIcon } from '@heroicons/react/24/solid';

export default function Video({ src }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="grid">
      {isClient ? (
        <ReactPlayer
          url={src}
          controls
          light
          playing
          width=""
          height=""
          playIcon={<PlayIcon className="w-16 h-16 text-pink" />}
          style={{ gridRow: '1 / -1', gridColumn: '1 / -1', zIndex: 1 }}
        />
      ) : null}
      <div className="aspect-video bg-slate-900 z-0 col-span-full row-span-full flex flex-col items-center justify-center">
        <Link href={src}>
          <PlayIcon className="w-16 h-16 text-pink animate-pulse" />
        </Link>
      </div>
    </div>
  );
}
