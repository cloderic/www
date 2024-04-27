import { H1 } from '../../components/title';
import listContent from './utils/listContent';
import sortBy from 'lodash.sortby';
import ContentList from '../../components/contentList';

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
  const sortedContent = sortBy(content, 'date').reverse();
  return (
    <>
      <H1 noanchor>Archive</H1>
      <ContentList
        items={sortedContent}
        renderDate={({ date }) => date.toFormat('yyyy/MM/dd')}
        renderTitle={({ title }) => title}
        renderSubtitle={({}) => null}
      />
    </>
  );
}
