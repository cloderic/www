import { YouTubeEmbed } from '@next/third-parties/google';
import MediaPlayer from './mediaPlayer';

export default function YouTube({ videoId, originalHref, ...otherProps }) {
  return (
    <MediaPlayer
      originalLabel="Open on YouTube"
      originalHref={`https://www.youtube.com/watch?v=${videoId}`}
      {...otherProps}
    >
      <YouTubeEmbed params="controls=0" videoid={videoId} />
    </MediaPlayer>
  );
}
