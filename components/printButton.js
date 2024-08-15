import clsx from 'clsx';
import { defineMessage } from '@formatjs/intl';
import PrintButtonClient from './printButtonClient';

export default function PrintButton({ className, intl, ...otherProps }) {
  const message = defineMessage({
    id: 'actions.print',
    defaultMessage: 'Print or save to pdf...'
  });

  return (
    <PrintButtonClient
      className={clsx(
        'bg-pink text-blue py-2 px-4 rounded-full text-sm print:hidden',
        className
      )}
      {...otherProps}
    >
      {intl.formatMessage(message)}
    </PrintButtonClient>
  );
}
