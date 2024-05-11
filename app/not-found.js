import { H1 } from '../components/title';
import Link from '../components/link';
import HomeLink from '../components/homeLink';
import HeroImage from '../components/heroImage';

export default function NotFound() {
  return (
    <div>
      <HeroImage
        src="https://http.cat/404"
        height={600}
        alt="HTTP 404 error illustrated by a cat picture"
      />
      <H1 noanchor>Could not find requested resource</H1>
      <Link href="/">Return Home</Link>
      <div className="text-center">
        <HomeLink />
      </div>
    </div>
  );
}
