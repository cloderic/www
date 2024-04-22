import { H1 } from '../components/base';
import Link from '../components/link';
import Image from 'next/image';
import HomeLink from '../components/homeLink';

export default function NotFound() {
  return (
    <div>
      <div className="-mt-4 -mx-4 md:-mt-8 md:-mx-8">
        <Image
          src="https://http.cat/404"
          width={750}
          height={600}
          alt="HTTP 404 error illustrated by a cat picture"
        />
      </div>
      <H1 noanchor>Could not find requested resource</H1>
      <Link href="/">Return Home</Link>
      <div className="text-center">
        <HomeLink />
      </div>
    </div>
  );
}
