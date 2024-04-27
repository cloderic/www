import { H1 } from '../../components/title';
import Link from '../../components/link';
import HomeLink from '../../components/homeLink';
import listContent from '../content/utils/listContent';
import sortBy from 'lodash.sortby';

export const metadata = {
  title: 'Music',
  alternates: {
    canonical: '/content/music'
  }
};

export default async function Music() {
  const content = (
    await listContent({ parseFrontmatter: true })
  ).filter(({ categories = [] }) => categories.find((c) => c === 'music'));
  const sortedContent = sortBy(content, 'date').reverse();
  return (
    <>
      <H1 noanchor>🎸 Music</H1>
      <ul>
        {sortedContent.map(({ slug, title, date }, index) => (
          <li key={index}>
            <Link href={`/content/${slug}`}>
              {title} / {date.toFormat('yyyy/MM/dd')}
            </Link>
          </li>
        ))}
      </ul>
      <footer className="mt-4 text-center">
        <HomeLink />
      </footer>
    </>
  );
}
