import 'server-only';

import { createIntl, createIntlCache } from '@formatjs/intl';

const cache = createIntlCache();

export default async function getIntl(locale) {
  return createIntl(
    {
      locale: locale,
      messages: (await import(`./${locale}.json`)).default
    },
    cache
  );
}
