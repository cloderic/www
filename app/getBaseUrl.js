export default function getBaseUrl() {
  if (process.env.DEPLOY_PRIME_URL != null) {
    // `DEPLOY_PRIME_URL` is set by netlify to represent the primary URL for an individual deploy,
    return new URL(process.env.DEPLOY_PRIME_URL);
  }

  if (process.env.URL != null) {
    // `URL` is set by netlify to the main address of the site
    // It can also be set locally in the `.env`
    return new URL(process.env.URL);
  }

  if (process.env.NODE_ENV == 'development') {
    // We assume the site is ran using `next dev`
    return new URL(`http://localhost:${process.env.PORT}`);
  }

  return new URL('http://example.com');
}
