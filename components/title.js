import clsx from 'clsx';
import slugify from '@sindresorhus/slugify';
import { LinkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useMemo } from 'react';
import Children from 'react-children-utilities';

export default function Title({
  children,
  className,
  as: Tag = 'h1',
  noanchor,
  ...otherProps
}) {
  const anchor = useMemo(
    () => (noanchor ? undefined : slugify(Children.onlyText(children))),
    [noanchor, children]
  );
  return (
    <Tag
      {...otherProps}
      className={clsx(className, 'group relative mt-2 font-title')}
      id={anchor}
    >
      {anchor != null ? (
        <Link
          href={`#${anchor}`}
          className="absolute hidden group-hover:inline -start-5"
        >
          <LinkIcon className="inline w-4 h-4 me-1" />
        </Link>
      ) : null}
      {children}
    </Tag>
  );
}

export function H1({ className, ...otherProps }) {
  return (
    <Title
      tag="h1"
      className={clsx(className, 'text-4xl font-extralight text-blue')}
      {...otherProps}
    />
  );
}

export function H2({ className, ...otherProps }) {
  return (
    <Title
      tag="h2"
      className={clsx(className, 'text-3xl font-extralight text-blue')}
      {...otherProps}
    />
  );
}

export function H3({ className, ...otherProps }) {
  return (
    <Title
      tag="h3"
      className={clsx(className, 'text-lg text-blue')}
      {...otherProps}
    />
  );
}

export function H4({ className, ...otherProps }) {
  return (
    <Title
      tag="h4"
      className={clsx(className, 'text-lg italic text-blue')}
      {...otherProps}
    />
  );
}
