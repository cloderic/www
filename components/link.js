import NextLink from 'next/link';
import getBaseUrl from '../app/getBaseUrl';
import { useMemo } from 'react';

export default function Link({
  children,
  href,
  title,
  noprinturl,
  ...otherProps
}) {
  const [hrefUrl, hrefExternal] = useMemo(() => {
    if (URL.canParse(href)) {
      return [new URL(href), true];
    }
    return [new URL(href, getBaseUrl()), false];
  }, [href]);
  return (
    <NextLink
      href={href}
      target={hrefExternal ? '_blank' : '_self'}
      rel={hrefExternal ? 'noreferrer noopener' : ''}
      title={title}
      aria-label={title}
      {...otherProps}
    >
      {children}
      {!noprinturl ? (
        <span className="hidden print:inline">{` (${hrefUrl.host}${
          hrefUrl.pathname == '/' ? '' : hrefUrl.pathname
        }${hrefUrl.search})`}</span>
      ) : null}
    </NextLink>
  );
}
