import clsx from 'clsx';

import NextLink from 'next/link';

const ABSOLUTE_URL = /[a-zA-Z][-+.a-zA-Z]*:.*/;

export default function Link({ children, className, href, ...otherProps }) {
  if (ABSOLUTE_URL.test(href)) {
    return (
      <NextLink
        {...otherProps}
        href={href}
        className={clsx(className, 'text-blue hover:underline')}
        target="_blank"
        rel="noreferrer noopener"
      >
        {children}
      </NextLink>
    );
  }
  return (
    <NextLink
      {...otherProps}
      href={href}
      className={clsx(className, 'text-blue hover:underline')}
    >
      {children}
    </NextLink>
  );
}
