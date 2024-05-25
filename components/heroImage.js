import clsx from 'clsx';
import Image from 'next/image';

export default function HeroImage({
  className,
  width,
  height,
  fill = false,
  ...otherProps
}) {
  return (
    <div
      className={clsx(
        '-mt-4 -mx-4 md:-mt-8 md:-mx-8',
        fill && 'relative aspect-video'
      )}
    >
      <Image
        className={clsx(
          className,
          'object-cover',
          height == null && 'aspect-video'
        )}
        width={width == null && !fill ? 750 : width}
        height={height}
        fill={fill}
        {...otherProps}
      />
    </div>
  );
}
