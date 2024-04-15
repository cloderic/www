import clsx from 'clsx';
import Link from 'next/link';
import {
  ArrowDownTrayIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/solid';

export default function Pdf({
  className,
  title,
  src,
  page,
  href,
  disableDownload
}) {
  const pdfOptions = {
    toolbar: '0',
    view: 'FitH'
  };
  if (page != null) {
    pdfOptions['page'] = page;
  }
  const fullSrc =
    src +
    '#' +
    Object.keys(pdfOptions)
      .map((optionKey) => `${optionKey}=${pdfOptions[optionKey]}`)
      .join('&');
  return (
    <div className="flex flex-col bg-zinc-800 p-2">
      <iframe
        className={clsx(className, 'w-full')}
        src={fullSrc}
        title={title}
      />
      <div className="flex gap-4 justify-end text-white text-sm">
        {!disableDownload ? (
          <Link href={src}>
            <ArrowDownTrayIcon className="inline w-3 h-3" /> Download
          </Link>
        ) : null}
        {href != null ? (
          <Link href={href}>
            <ArrowTopRightOnSquareIcon className="inline w-3 h-3" /> Open
            original
          </Link>
        ) : null}
      </div>
    </div>
  );
}
