import clsx from 'clsx';
import Link from '../link';
import {
  ArrowDownTrayIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/solid';

export default function MediaPlayer({
  children,
  originalLabel = 'Open original',
  originalHref = null,
  downloadLabel = 'Download',
  downloadHref = null,
  className,
  ...otherProps
}) {
  return (
    <div
      className={clsx(className, 'flex flex-col bg-slate-800 p-2')}
      {...otherProps}
    >
      {children}
      <div className="flex gap-4 justify-end text-white text-sm">
        {downloadHref != null ? (
          <Link href={downloadHref} className="text-white">
            <ArrowDownTrayIcon className="inline w-3 h-3" /> {downloadLabel}
          </Link>
        ) : null}
        {originalHref != null ? (
          <Link href={originalHref} className="text-white">
            <ArrowTopRightOnSquareIcon className="inline w-3 h-3" />{' '}
            {originalLabel}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
