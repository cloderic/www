import clsx from 'clsx';

import NextLink from 'next/link';

const ABSOLUTE_URL = /[a-zA-Z][-+.a-zA-Z]*:.*/;

export default function Link({
  children,
  className,
  href,
  title,
  ...otherProps
}) {
  if (ABSOLUTE_URL.test(href)) {
    return (
      <NextLink
        href={href}
        className={clsx(className, 'text-blue hover:underline')}
        target="_blank"
        rel="noreferrer noopener"
        title={title}
        aria-label={title}
        {...otherProps}
      >
        {children}
      </NextLink>
    );
  }
  return (
    <NextLink
      href={href}
      className={clsx(className, 'text-blue hover:underline')}
      title={title}
      aria-label={title}
      {...otherProps}
    >
      {children}
    </NextLink>
  );
}
