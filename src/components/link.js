import React from 'react';
import GatsbyLink from 'gatsby-link';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

const ABSOLUTE_URL = /[a-zA-Z][-+.a-zA-Z]*:.*/;
const WITH_EXTENSION_URL = /\.[^.]+$/;
const SITE_URL = /^\/(?!\/)/;

const Link = ({ href, children, ...otherProps }) =>
  ABSOLUTE_URL.test(href) ? (
    <OutboundLink
      target="_blank"
      rel="noreferrer noopener"
      {...otherProps}
      href={href}
    >
      {children}
    </OutboundLink>
  ) : SITE_URL.test(href) && !WITH_EXTENSION_URL.test(href) ? (
    <GatsbyLink {...otherProps} to={href}>
      {children}
    </GatsbyLink>
  ) : (
    <a {...otherProps} href={href}>
      {children}
    </a>
  );
export default Link;
