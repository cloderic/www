import loadContent from './content/utils/loadContent';
import { H1, H2 } from '../components/base';
import Link from '../components/link';
import Image from 'next/image';

export default async function Home() {
  const welcomeMdx = await loadContent('app/content/welcome.mdx');
  return (
    <>
      <div className="flex items-center gap-8">
        <Image
          src="/mars.png"
          width={150}
          height={150}
          alt="Picture of the mars"
        />
        <H1 noanchor>Welcome to my home page!</H1>
      </div>
      {welcomeMdx.content}
      <H2>Content</H2>
      <ul>
        <li>
          <Link href="/resume/en">Resume 🇬🇧</Link>
        </li>
        <li>
          <Link href="/resume/fr">CV 🇫🇷</Link>
        </li>
        <li>
          <Link href="/bio">Bio</Link>
        </li>
        <li>
          <Link href="/content/certifications">Certifications</Link>
        </li>
        <li>
          <Link href="/content">Archive</Link>
        </li>
      </ul>
    </>
  );
}
