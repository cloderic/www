import { H1, H2 } from '../../components/title';
import listContent from './utils/listContent';
import sortBy from 'lodash.sortby';
import ContentList from '../../components/contentList';
import groupBy from 'lodash.groupby';

export const metadata = {
  title: 'Content Archive',
  alternates: {
    canonical: '/content'
  }
};

export default async function Page() {
  const content = (await listContent({ parseFrontmatter: true })).filter(
    ({ date, hidden }) => date != null && !hidden
  );
  const groupedContent = groupBy(content, ({ date }) => date.year);
  return (
    <div className="max-w-prose">
      <H1 noanchor>Archive</H1>
      {Object.keys(groupedContent)
        .sort()
        .reverse()
        .map((year) => (
          <>
            <H2 noanchor>{year}</H2>
            <ContentList
              items={sortBy(groupedContent[year], 'date').reverse()}
            />
          </>
        ))}
    </div>
  );
}
