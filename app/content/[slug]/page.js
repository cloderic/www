import Image from 'next/image';
import { notFound } from 'next/navigation';

import { H1 } from '../../../components/title';
import loadContent from '../utils/loadContent';
import listContent from '../utils/listContent';
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
    },
    alternates: {
      canonical: frontmatter.canonicalUrl || `/content/${params.slug}`
    }
  };
}

export default async function Page({ params }) {
  const { content, frontmatter } = await loadMatchingContent({ params });
  const publicationDate = frontmatter.date;
  const updateDate = frontmatter.last_update;
  return (
    <div className="max-w-prose">
      {frontmatter.cover ? (
        <div className="relative aspect-video -mt-4 -mx-4 md:-mt-8 md:-mx-8">
          <Image
            fill={true}
            src={frontmatter.cover}
            className="object-cover"
            alt={`cover for "${frontmatter.title}"`}
          />
        </div>
      ) : null}
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
    </div>
  );
}

export async function generateStaticParams() {
  const contentList = await listContent();
  return contentList.map(({ slug }) => slug);
}
