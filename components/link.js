import clsx from 'clsx';

import NextLink from 'next/link';

const ABSOLUTE_URL = /[a-zA-Z][-+.a-zA-Z]*:.*/;

export default function Link({ children, href, title, ...otherProps }) {
  if (ABSOLUTE_URL.test(href)) {
    return (
      <NextLink
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        title={title}
        aria-label={title}
        {...otherProps}
      >
        {children}
        <span className="hidden print:inline">{` (${href})`}</span>
      </NextLink>
    );
  }
  return (
    <NextLink href={href} title={title} aria-label={title} {...otherProps}>
      {children}
      <span className="hidden print:inline">{` (https://cloderic.com${href})`}</span>
    </NextLink>
  );
}
