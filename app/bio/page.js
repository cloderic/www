import loadContent from '../content/utils/loadContent';
import listContent from '../content/utils/listContent';
import { H1 } from '../../components/base';
import HomeLink from '../../components/homeLink';
import sortBy from 'lodash.sortby';
import ContentList from '../../components/contentList';

export const metadata = {
  title: 'Biography',
  alternates: {
    canonical: '/bio'
  }
};

export default async function Bio({}) {
  const bioEnMdx = await loadContent('app/content/bio-en.mdx');
  const bioFrMdx = await loadContent('app/content/bio-fr.mdx');
  const talks = (
    await listContent({ parseFrontmatter: true })
  ).filter(({ categories = [] }) =>
    categories.find((category) => category == 'talk')
  );
  const sortedTalks = sortBy(talks, 'date').reverse();

  return (
    <>
      <H1>Biography 🇬🇧</H1>
      {bioEnMdx.content}
      <H1>Biographie 🇫🇷</H1>
      {bioFrMdx.content}
      <H1>Talks</H1>
      <ContentList
        items={sortedTalks}
        renderDate={({ date }) => date.toFormat('yyyy/MM/dd')}
        renderTitle={({ short_title, title }) => short_title || title}
        renderSubtitle={({ venue }) => `@ ${venue}`}
      />
      <footer className="mt-4 text-center">
        <HomeLink />
      </footer>
    </>
  );
}
