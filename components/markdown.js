import clsx from 'clsx';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';

import Link from './link';
import Title from './title';
import Pdf from './players/pdf';
import Audio from './players/audio';
import SoundCloud from './players/soundCloud';
import YouTube from './players/youtube';
import { Tweet } from 'react-tweet';

function img(props) {
  return (
    <span className="block relative aspect-video">
      <Image {...props} fill={true} className="object-contain not-prose" />
    </span>
  );
}

function h1(props) {
  return <Title as="h1" {...props} />;
}

function h2(props) {
  return <Title as="h2" {...props} />;
}

function h3(props) {
  return <Title as="h3" {...props} />;
}

function h4(props) {
  return <Title as="h4" {...props} />;
}

function h5(props) {
  return <Title as="h5" {...props} />;
}

function wrapper({ className, children, components, ...otherProps }) {
  return (
    <article
      {...otherProps}
      className={clsx(
        className,
        'prose',
        'prose-a:no-underline hover:prose-a:underline',
        'prose-headings:font-title prose-headings:font-light',
        'prose-h1:font-extralight prose-h1:text-4xl',
        'prose-h2:font-extralight prose-h2:text-3xl'
      )}
    >
      {children}
    </article>
  );
}

const baseComponents = {
  a: Link,
  img,
  h1,
  h2,
  h3,
  h4,
  h5,
  Pdf,
  Audio,
  SoundCloud,
  YouTube,
  Tweet
};

export const components = {
  wrapper,
  ...baseComponents
};

export function Mdx({ children, className, ...otherProps }) {
  return (
    <MDXRemote source={children} components={baseComponents} {...otherProps} />
  );
}
