import clsx from 'clsx';
import Image from 'next/image';

export { default as a } from './link';
import Title from './title';
export { default as Pdf } from './players/pdf';
export { default as Audio } from './players/audio';
export { default as SoundCloud } from './players/soundCloud';
export { default as YouTube } from './players/youtube';
export { Tweet } from 'react-tweet';

export function img(props) {
  return (
    <span className="block relative aspect-video">
      <Image {...props} fill={true} className="object-contain not-prose" />
    </span>
  );
}

export function h1(props) {
  return <Title as="h1" {...props} />;
}

export function h2(props) {
  return <Title as="h2" {...props} />;
}

export function h3(props) {
  return <Title as="h3" {...props} />;
}

export function h4(props) {
  return <Title as="h4" {...props} />;
}

export function h5(props) {
  return <Title as="h5" {...props} />;
}

export function wrapper({ className, children, components, ...otherProps }) {
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
