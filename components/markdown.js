export {
  H1 as h1,
  H2 as h2,
  H3 as h3,
  H4 as h4,
  P as p,
  Em as em,
  Blockquote as blockquote,
  Pre as pre,
  Code as code,
  Ul as ul,
  Ol as ol
} from './base';
export { default as a } from './link';
import Image from 'next/image';
export { default as Video } from './players/video';
export { default as Pdf } from './players/pdf';
export { default as Audio } from './players/audio';
export { Tweet } from 'react-tweet';

export function img(props) {
  return (
    <span className="block relative aspect-video">
      <Image {...props} fill={true} className="object-contain" />
    </span>
  );
}
