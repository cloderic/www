import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { HomeIcon } from '@heroicons/react/24/solid';

export default function Title({ className, ...otherProps }) {
  return (
    <Link
      href="/"
      className={clsx(
        className,
        'inline-grid bg-pink text-blue p-2 rounded-full group'
      )}
      title="Get back to the home page"
      {...otherProps}
    >
      <HomeIcon className="row-span-full col-span-full w-[28px] h-[28px] transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
      <Image
        src="/mars.png"
        width={28}
        height={28}
        className="row-span-full col-span-full transition-opacity duration-500 group-hover:opacity-0"
        alt="(get back to the home page)"
      />
    </Link>
  );
}
