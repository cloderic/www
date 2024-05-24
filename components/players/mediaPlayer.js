import clsx from 'clsx';
import Link from '../link';
import {
  ArrowDownTrayIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/solid';

export function OriginalLink({
  href,
  label = 'Open original',
  hideLabel = false,
  ...otherProps
}) {
  return (
    <Link href={href} {...otherProps} title={label}>
      <ArrowTopRightOnSquareIcon className="inline w-3 h-3" />
      {hideLabel ? null : <span> {label}</span>}
    </Link>
  );
}

export function DownloadLink({
  href,
  label = 'Download',
  hideLabel = false,
  ...otherProps
}) {
  return (
    <Link href={href} {...otherProps} title={label}>
      <ArrowDownTrayIcon className="inline w-3 h-3" />
      {hideLabel ? null : <span> {label}</span>}
    </Link>
  );
}

export default function MediaPlayer({
  children,
  originalLabel = undefined,
  originalHref = undefined,
  downloadLabel = undefined,
  downloadHref = undefined,
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
          <DownloadLink
            href={downloadHref}
            label={downloadLabel}
            className="text-white"
          />
        ) : null}
        {originalHref != null ? (
          <OriginalLink
            href={originalHref}
            label={originalLabel}
            className="text-white"
          />
        ) : null}
      </div>
    </div>
  );
}
