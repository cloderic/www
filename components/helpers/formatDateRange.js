import { DateTime } from 'luxon';
import { defineMessages } from '@formatjs/intl';

export default function formatDateRange({ from, to = null, intl }) {
  const messages = defineMessages({
    fromTo: {
      id: 'item.date.fromTo',
      defaultMessage: 'from {fromDate} to {toDate}'
    },
    since: {
      id: 'item.date.since',
      defaultMessage: 'since {fromDate}'
    }
  });
  const fromDate = DateTime.fromISO(from);
  if (to != null) {
    const toDate = DateTime.fromISO(to);
    return intl.formatMessage(messages.fromTo, {
      fromDate: fromDate.toFormat('yyyy/MM'),
      toDate: toDate.toFormat('yyyy/MM')
    });
  }
  return intl.formatMessage(messages.since, {
    fromDate: fromDate.toFormat('yyyy/MM')
  });
}
