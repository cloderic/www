import loadContent from '../content/utils/loadContent';
import listContent from '../content/utils/listContent';
import { H1, H2 } from '../../components/title';
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
      <H1>Biography</H1>
      <H2 className="italic">English blurb 🇬🇧</H2>
      {bioEnMdx.content}
      <H2 className="italic">French blurb 🇫🇷</H2>
      {bioFrMdx.content}
      <H2>Talks</H2>
      <ContentList
        items={talks}
        renderDate={({ date }) => date.toFormat('yyyy/MM/dd')}
        renderTitle={({ title }) => title}
        renderSubtitle={({ venue }) => venue}
      />
      <H2>Peer-reviewed publications</H2>
      <ContentList
        items={publications}
        renderDate={({ date, venue }) =>
          `${date.toFormat('yyyy/MM')} - ${venue}`
        }
        renderTitle={({ title }) => title}
        renderSubtitle={({ authors = [] }) => authors.join(', ')}
      />
      <footer className="mt-4 text-center">
        <HomeLink />
      </footer>
    </div>
  );
}
