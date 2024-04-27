import sortBy from 'lodash.sortby';

import loadContent from '../../content/utils/loadContent';
import listContent from '../../content/utils/listContent';
import { H1, H2, H3 } from '../../../components/title';
import ContentList from '../../../components/contentList';

export const metadata = {
  title: 'Resume',
  alternates: {
    canonical: '/resume/en'
  }
};

export default async function ResumeEn({}) {
  const { content, frontmatter } = await loadContent(
    'app/content/resume-en.mdx'
  );
  const contentItems = sortBy(
    await listContent({ parseFrontmatter: true }),
    'date'
  ).reverse();
  const talks = contentItems.filter(({ categories = [] }) =>
    categories.find((category) => category == 'talk')
  );
  const publications = contentItems.filter(({ categories = [] }) =>
    categories.find((category) => category == 'publication')
  );
  const certifications = contentItems.filter(({ categories = [] }) =>
    categories.find((category) => category == 'certification')
  );
  return (
    <>
      <H1>{frontmatter.title}</H1>
      {frontmatter.header}
      {content}
      <H2>Education</H2>
      <H3>MOOCS</H3>
      <ContentList
        items={certifications}
        renderDate={({ date }) => `${date.toFormat('yyyy/MM')}`}
        renderTitle={({ title, short_title, organization }) => (
          <>
            <strong>{organization}</strong> - {short_title || title}
          </>
        )}
        renderSubtitle={({ topics = [] }) => topics.join(', ')}
      />
      <H2>Talks</H2>
      <ContentList
        items={talks}
        renderDate={({ date }) => date.toFormat('yyyy/MM/dd')}
        renderTitle={({ short_title, title }) => short_title || title}
        renderSubtitle={({ venue }) => `@ ${venue}`}
      />
    </>
  );
}
