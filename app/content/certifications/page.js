import { H1 } from '../../../components/base';
import Link from '../../../components/link';
import HomeLink from '../../../components/homeLink';
import listContent from '../utils/listContent';
import sortBy from 'lodash.sortby';

export const metadata = {
  title: 'MOOCS & Certifications',
  alternates: {
    canonical: '/content/certifications'
  }
};

export default async function Page() {
  const content = (
    await listContent({ parseFrontmatter: true })
  ).filter(({ categories = [] }) =>
    categories.find((c) => c === 'certification')
  );
  const sortedContent = sortBy(content, 'date').reverse();
  return (
    <>
      <H1 noanchor>MOOCS & Certifications</H1>
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
