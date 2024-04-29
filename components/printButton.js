'use client';

import clsx from 'clsx';

export default function PrintButton({ className, ...otherProps }) {
  return (
    <button
      className={clsx(
        'bg-pink text-blue py-2 px-4 rounded-full text-sm print:hidden',
        className
      )}
      onClick={() => print()}
      {...otherProps}
    >
      Print or save to pdf...
    </button>
  );
}
