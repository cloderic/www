import { YouTubeEmbed } from '@next/third-parties/google';
import MediaPlayer from './mediaPlayer';

export default function YouTube({ videoId, href, ...otherProps }) {
  return (
    <MediaPlayer
      originalLabel="Open on YouTube"
      href={`https://www.youtube.com/watch?v=${videoId}`}
      {...otherProps}
    >
      <YouTubeEmbed params="controls=0" videoid={videoId} />
    </MediaPlayer>
  );
}
