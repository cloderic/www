import { H1 } from '../../../components/base';
import { DateTime } from 'luxon';
import loadContent from '../utils/loadContent';
import listContent from '../utils/listContent';
import { notFound } from 'next/navigation';

async function loadMatchingContent({ params }) {
  const matchingContent = (await listContent()).find(
    ({ slug }) => slug === params.slug
  );
  if (!matchingContent) {
    notFound();
  }
  return await loadContent(matchingContent.path);
}

// export async function generateMetadata({ params }) {
//   const { frontmatter } = await loadMatchingContent({ params });
//   return {
//     title: frontmatter.title
//   };
// }

export default async function Page({ params }) {
  const { content, frontmatter } = await loadMatchingContent({ params });
  const publicationDate =
    frontmatter.date && DateTime.fromJSDate(frontmatter.date, { zone: 'UTC' });
  const updateDate =
    frontmatter.last_update &&
    DateTime.fromJSDate(frontmatter.last_update, { zone: 'UTC' });
  return (
    <>
      <H1 noanchor>{frontmatter.title}</H1>
      {frontmatter.date && (
        <small>
          Published on{' '}
          <time dateTime={publicationDate.toISODate()}>
            {publicationDate.toFormat('yyyy/MM/dd')}
          </time>
          .
        </small>
      )}
      {content}
      <footer>
        {updateDate && (
          <p>
            <small>
              Last updated on{' '}
              <time dateTime={updateDate.toISODate()}>
                {updateDate.toFormat('yyyy/MM/dd')}
              </time>
              .
            </small>
          </p>
        )}
      </footer>
    </>
  );
}

export async function generateStaticParams() {
  return (await listContent()).map(({ slug }) => slug);
}
