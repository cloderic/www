import loadContent from './content/utils/loadContent';
import listContent from './content/utils/listContent';
import { H1, H2 } from '../components/base';
import Link from '../components/link';
import Image from 'next/image';
import sortBy from 'lodash.sortby';

export default async function Home() {
  const welcomeMdx = await loadContent('app/content/welcome.mdx');
  const highlights = (await listContent({ parseFrontmatter: true })).filter(
    ({ highlight }) => highlight
  );
  const sortedHighlights = sortBy(highlights, 'date').reverse();

  return (
    <>
      <div className="flex items-center gap-8">
        <Image
          src="/mars.png"
          width={150}
          height={150}
          alt="Picture of the mars"
        />
        <div>
          <H1 noanchor>Clodéric Mars</H1>
          <p>AI Product Engineer / Tech Leader / Public Speaker</p>
        </div>
      </div>
      {welcomeMdx.content}
      <H2>Highlights</H2>
      <ul>
        {sortedHighlights.map(({ slug, title, date }, index) => (
          <li key={index}>
            <time dateTime={date.toISODate()}>
              {date.toFormat('yyyy/MM/dd')}
            </time>
            {' - '}
            <Link href={`/content/${slug}`}>{title}</Link>
          </li>
        ))}
      </ul>
      <H2>All Content</H2>
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
