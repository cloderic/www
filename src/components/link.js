import React from 'react';
import GatsbyLink from 'gatsby-link';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

const ABSOLUTE_URL = /[a-zA-Z][-+.a-zA-Z]*:.*/;

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
  ) : (
    <GatsbyLink {...otherProps} to={href}>
      {children}
    </GatsbyLink>
  );

export default Link;
