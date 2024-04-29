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
      className={clsx(className, 'group relative mt-2 mb-1')}
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

export function Subtitle({ className, top = false, ...otherProps }) {
  return (
    <span
      className={clsx(className, 'block', top ? 'mt-2 -mb-2' : 'mb-1 -mt-1')}
      {...otherProps}
    />
  );
}

export function H1({ className, ...otherProps }) {
  return (
    <Title
      as="h1"
      className={clsx(
        className,
        'text-4xl font-extralight text-blue font-title'
      )}
      {...otherProps}
    />
  );
}

export function H2({ className, ...otherProps }) {
  return (
    <Title
      as="h2"
      className={clsx(
        className,
        'text-3xl font-extralight text-blue font-title'
      )}
      {...otherProps}
    />
  );
}

export function H3({ className, ...otherProps }) {
  return (
    <Title
      tag="h3"
      className={clsx(className, 'text-lg text-blue font-title')}
      {...otherProps}
    />
  );
}
