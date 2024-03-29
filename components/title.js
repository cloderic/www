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
      className={clsx(className, 'group relative mt-2')}
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
