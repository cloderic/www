import clsx from 'clsx';
import MediaPlayer from './mediaPlayer';

export default function Pdf({
  className,
  title,
  src,
  page,
  href,
  disableDownload,
  ...otherProps
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
    <MediaPlayer
      originalLabel="Open original"
      href={href}
      src={disableDownload ? null : src}
      {...otherProps}
    >
      <iframe
        className={clsx(className, 'w-full')}
        src={fullSrc}
        title={title}
      />
    </MediaPlayer>
  );
}
