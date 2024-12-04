import loadContent from './content/utils/loadContent';
import listContent from './content/utils/listContent';
import { H1, H2 } from '../components/title';
import Link from '../components/link';
import ContentList from '../components/contentList';
import Image from 'next/image';
import sortBy from 'lodash.sortby';
import Twitter from '../components/logos/twitter';
import LinkedIn from '../components/logos/linkedIn';
import SoundCloud from '../components/logos/soundCloud';
import GoogleScholar from '../components/logos/googleScholar';
import Bluesky from '../components/logos/bluesky';

export default async function Home() {
  const welcomeMdx = await loadContent('app/content/welcome.mdx');
  const highlights = (
    await listContent({ parseFrontmatter: true })
  ).filter(({ categories = [] }) =>
    categories.find((category) => category == 'highlights')
  );
  const sortedHighlights = sortBy(highlights, 'date').reverse();

  return (
    <div className="max-w-prose">
      <div className="flex items-center gap-8">
        <Image src="/mars.png" width={150} height={150} alt="Picture of Mars" />
        <div>
          <H1 noanchor>Clodéric Mars</H1>
          <p className="text-5xl my-2">🧑‍🦱🤝🤖</p>
          <p className="text-blue flex gap-2 my-2">
            <Link
              href="https://bsky.app/profile/cloderic.bsky.social"
              title="Clodéric on Bluesky"
            >
              <Bluesky className="h-6 w-6" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/cloderic"
              title="Clodéric on LinkedIn"
            >
              <LinkedIn className="h-6 w-6" />
            </Link>
            <Link
              href="https://scholar.google.com/citations?user=fvCC1rwAAAAJ"
              title="Clodéric on Google Scholar"
            >
              <GoogleScholar className="h-6 w-6" />
            </Link>
            <Link
              href="https://twitter.com/cloderic"
              title="Clodéric on Twitter"
            >
              <Twitter className="h-6 w-6" />
            </Link>
            <Link
              href="https://soundcloud.com/cloderic"
              title="Clodéric on SoundCloud"
            >
              <SoundCloud className="h-6 w-6" />
            </Link>
          </p>
        </div>
      </div>
      {welcomeMdx.content}
      <H2>Highlights</H2>
      <ContentList items={sortedHighlights} />
      <ul className="flex mt-8 justify-between">
        <li>
          <Link
            href="/resume/en"
            className="text-blue text-lg hover:underline py-2 px-4 bg-pink rounded-full"
          >
            Resume
          </Link>
        </li>
        <li>
          <Link
            href="/resume/fr"
            className="text-blue text-lg hover:underline py-2 px-4 bg-pink rounded-full"
          >
            CV
          </Link>
        </li>
        <li>
          <Link
            href="/bio"
            className="text-blue text-lg hover:underline py-2 px-4 bg-pink rounded-full"
          >
            Bio
          </Link>
        </li>
        <li>
          <Link
            href="/music"
            className="text-blue text-lg hover:underline py-2 px-4 bg-pink rounded-full"
          >
            Music
          </Link>
        </li>
        <li>
          <Link
            href="/content"
            className="text-blue text-lg hover:underline py-2 px-4 bg-pink rounded-full"
          >
            Archive
          </Link>
        </li>
      </ul>
    </div>
  );
}
