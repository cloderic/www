import { H1 } from '../../../components/base';
import loadContent from '../utils/loadContent';
import listContent from '../utils/listContent';
import { notFound } from 'next/navigation';
import HomeLink from '../../../components/homeLink';

export async function loadMatchingContent({ params }) {
  const matchingContent = (await listContent()).find(
    ({ slug }) => slug === params.slug
  );
  if (!matchingContent) {
    notFound();
  }
  return await loadContent(matchingContent.path);
}

export async function generateMetadata({ params }) {
  const { frontmatter } = await loadMatchingContent({ params });
  return {
    title: frontmatter.title,
    openGraph: {
      type: 'article',
      publishedTime: frontmatter.date.toISO()
    }
  };
}

export default async function Page({ params }) {
  const { content, frontmatter } = await loadMatchingContent({ params });
  const publicationDate = frontmatter.date;
  const updateDate = frontmatter.last_update;
  return (
    <>
      <header className="mb-4">
        <H1 noanchor>{frontmatter.title}</H1>
        {frontmatter.date && (
          <p className="text-xs">
            Published on{' '}
            <time dateTime={publicationDate.toISODate()}>
              {publicationDate.toFormat('yyyy/MM/dd')}
            </time>
            .
          </p>
        )}
      </header>
      {content}
      <footer className="mt-4">
        {updateDate && (
          <p className="text-xs">
            Last updated on{' '}
            <time dateTime={updateDate.toISODate()}>
              {updateDate.toFormat('yyyy/MM/dd')}
            </time>
            .
          </p>
        )}
        <div className="text-center">
          <HomeLink />
        </div>
      </footer>
    </>
  );
}

export async function generateStaticParams() {
  return (await listContent()).map(({ slug }) => slug);
}
