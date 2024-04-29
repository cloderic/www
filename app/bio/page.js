import loadContent from '../content/utils/loadContent';
import listContent from '../content/utils/listContent';
import { H1 } from '../../components/title';
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
  const content = sortBy(
    await listContent({ parseFrontmatter: true }),
    'date'
  ).reverse();
  const talks = content.filter(({ categories = [] }) =>
    categories.find((category) => category == 'talk')
  );
  const publications = content.filter(({ categories = [] }) =>
    categories.find((category) => category == 'publication')
  );

  return (
    <div className="max-w-prose">
      <H1>Biography 🇬🇧</H1>
      {bioEnMdx.content}
      <H1>Biographie 🇫🇷</H1>
      {bioFrMdx.content}
      <H1>Talks</H1>
      <ContentList
        items={talks}
        renderDate={({ date }) => date.toFormat('yyyy/MM/dd')}
        renderTitle={({ short_title, title }) => short_title || title}
        renderSubtitle={({ venue }) => `@ ${venue}`}
      />
      <H1>Peer-reviewed publications</H1>
      <ContentList
        items={publications}
        renderDate={({ date, venue }) =>
          `${date.toFormat('yyyy/MM')} - ${venue}`
        }
        renderTitle={({ short_title, title }) => short_title || title}
        renderSubtitle={({ authors = [] }) => authors.join(', ')}
      />
      <footer className="mt-4 text-center">
        <HomeLink />
      </footer>
    </div>
  );
}
