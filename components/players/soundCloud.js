import { useMemo } from 'react';
import twConfig from '../../tailwind.config';
import MediaPlayer from './mediaPlayer';

export default function SoundCloud({ trackId, href, src, ...otherProps }) {
  const url = useMemo(() => {
    const url = new URL('https://w.soundcloud.com/player/');
    url.searchParams.append(
      'url',
      `https%3A//api.soundcloud.com/tracks/${trackId}`
    );
    url.searchParams.append('color', twConfig.theme.colors.pink.DEFAULT);
    url.searchParams.append('auto_play', false);
    url.searchParams.append('hide_related', true);
    url.searchParams.append('show_comments', false);
    url.searchParams.append('show_user', true);
    url.searchParams.append('show_reposts', false);
    url.searchParams.append('show_teaser', false);
    url.searchParams.append('visual', true);
    return url;
  }, [trackId]);
  return (
    <MediaPlayer
      originalLabel="Open in SoundCloud"
      href={href}
      src={src}
      {...otherProps}
    >
      <iframe
        width="100%"
        height="300"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        className="aspect-video"
        src={url.toString()}
      ></iframe>
    </MediaPlayer>
  );
}
