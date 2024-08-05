import { DateTime } from 'luxon';
import { parse } from 'yaml';
import { promises as fs } from 'fs';
import clsx from 'clsx';
import difference from 'lodash.difference';
import sortBy from 'lodash.sortby';

import { Mdx } from '../../../components/markdown';
import ContentList from '../../../components/contentList';
import listContent from '../../content/utils/listContent';
import PrintButton from '../../../components/printButton';
import Title, { Subtitle } from '../../../components/title';
import { Fragment } from 'react';

export async function loadResume({ params }) {
  const resumeFile = await fs.readFile(
    `app/resume/resume.${params.slug}.yml`,
    'utf8'
  );
  return parse(resumeFile);
}

export async function generateMetadata({ params }) {
  const resume = await loadResume({ params });
  return {
    title: resume.page_title,
    alternates: {
      canonical: `/resume/${params.slug}`,
      languages: {
        'en-US': '/resume/en',
        'fr-FR': '/resume/fr'
      }
    }
  };
}

export async function generateStaticParams() {
  return ['fr', 'en'];
}

function ItemTitle({ children, as = 'h3', from, to = null, location = null }) {
  const fromDate = DateTime.fromISO(from);
  const toDate = to != null ? DateTime.fromISO(to) : null;
  return (
    <>
      <Title as={as}>
        <Mdx>{children}</Mdx>
      </Title>
      <Subtitle className="text-blue-light text-xs">
        {toDate
          ? `from ${fromDate.toFormat('yyyy/MM')} to ${toDate.toFormat(
              'yyyy/MM'
            )}`
          : `since ${fromDate.toFormat('yyyy/MM')}`}
        {location ? ` - ${location}` : null}
      </Subtitle>
    </>
  );
}

function ItemDescription({ children }) {
  return <Mdx>{children}</Mdx>;
}

function LeftCol({ className, ...otherProps }) {
  return (
    <div
      className={clsx(
        'prose',
        'max-w-none',
        'prose-a:no-underline hover:prose-a:underline print:prose-a:no-underline',
        'prose-headings:font-title prose-headings:font-light *:prose-headings:m-0',
        'prose-li:mt-0 prose-li:mb-1',
        'prose-h1:font-extralight prose-h1:text-4xl',
        'prose-h2:font-extralight prose-h2:text-3xl',
        className
      )}
      {...otherProps}
    />
  );
}

function RightCol({ className, ...otherProps }) {
  return (
    <LeftCol
      className={clsx('prose-p:text-justify', className)}
      {...otherProps}
    />
  );
}

export default async function Resume({ params }) {
  const resume = await loadResume({ params });
  const contentItems = sortBy(
    await listContent({ parseFrontmatter: true }),
    'date'
  ).reverse();
  const resumeContentItems = contentItems.filter(({ categories = [] }) =>
    categories.find((category) => category == 'resume')
  );
  const publications = resumeContentItems.filter(({ categories = [] }) =>
    categories.find((category) => category == 'publication')
  );
  const talks = difference(
    resumeContentItems.filter(({ categories = [] }) =>
      categories.find((category) => category == 'talk')
    ),
    publications
  );
  const otherPublications = difference(resumeContentItems, publications, talks);
  const moocs = contentItems.filter(({ categories = [] }) =>
    categories.find((category) => category == 'mooc')
  );
  return (
    <div
      className={clsx(
        'grid max-w-screen-lg grid-cols-1 lg:grid-cols-[25ch_auto] print:max-w-[18cm] print:grid-cols-[4cm_auto] gap-4'
      )}
    >
      <LeftCol className="not-prose">
        <Title
          as="h1"
          className="text-6xl text-blue font-title font-light"
          noanchor
        >
          {resume.title}
        </Title>
        <Subtitle className="text-xl font-title">{resume.subtitle}</Subtitle>
        <address className="text-sm flex flex-col gap-2 my-4">
          {process.env.CONTACT_MAIL ? (
            <div>
              <Mdx>{process.env.CONTACT_MAIL}</Mdx>
            </div>
          ) : null}
          {process.env.CONTACT_PHONE ? (
            <div>
              <Mdx>{process.env.CONTACT_PHONE}</Mdx>
            </div>
          ) : null}
          <div>
            <Mdx>{process.env.CONTACT_ADDRESS || 'Montréal, QC\n\nCanada'}</Mdx>
          </div>
        </address>
        <PrintButton />
      </LeftCol>
      <RightCol>
        <ItemDescription className="">{resume.intro}</ItemDescription>
      </RightCol>
      <LeftCol>
        <Title as="h2">{resume.experiences.title}</Title>
      </LeftCol>
      <RightCol>
        {resume.experiences.items.map(
          ({ from, to, location, title, description, items = [] }, index) => (
            <section className="break-inside-avoid" key={index}>
              <ItemTitle from={from} to={to} location={location}>
                {title}
              </ItemTitle>
              <ItemDescription>{description}</ItemDescription>
              {items.map(
                ({ from, to, location, title, description }, index) => (
                  <Fragment key={index}>
                    <ItemTitle from={from} to={to} location={location} as="h4">
                      {title}
                    </ItemTitle>
                    <ItemDescription>{description}</ItemDescription>
                  </Fragment>
                )
              )}
            </section>
          )
        )}
        <Title as="h3">{resume.experiences.more.title}</Title>
        {resume.experiences.more.items.map(
          ({ from, to, location, title, description, items = [] }, index) => (
            <section className="break-inside-avoid" key={index}>
              <ItemTitle as="h4" from={from} to={to} location={location}>
                {title}
              </ItemTitle>
              <ItemDescription>{description}</ItemDescription>
              {items.map(
                ({ from, to, location, title, description }, index) => (
                  <Fragment key={index}>
                    <ItemTitle from={from} to={to} location={location} as="h4">
                      {title}
                    </ItemTitle>
                    <ItemDescription>{description}</ItemDescription>
                  </Fragment>
                )
              )}
            </section>
          )
        )}
      </RightCol>
      <LeftCol>
        <Title as="h2">{resume.education.title}</Title>
      </LeftCol>
      <RightCol>
        {resume.education.items.map(
          ({ from, to, location, title, description, items = [] }, index) => (
            <section className="break-inside-avoid" key={index}>
              <ItemTitle from={from} to={to} location={location}>
                {title}
              </ItemTitle>
              <ItemDescription>{description}</ItemDescription>
              {items.map(
                ({ from, to, location, title, description }, index) => (
                  <Fragment key={index}>
                    <ItemTitle from={from} to={to} location={location} as="h4">
                      {title}
                    </ItemTitle>
                    <ItemDescription>{description}</ItemDescription>
                  </Fragment>
                )
              )}
            </section>
          )
        )}
        <Title as="h3">{resume.education.moocs.title}</Title>
        <ContentList
          items={moocs}
          className="not-prose"
          renderDate={({ date }) => `${date.toFormat('yyyy/MM')}`}
          renderTitle={({ title, organization }) => (
            <>
              <strong>{organization}</strong> - {title}
            </>
          )}
          renderSubtitle={({ topics = [] }) => topics.join(', ')}
          noprinturl
        />
      </RightCol>
      <LeftCol>
        <Title as="h2">{resume.peer_review_publications.title}</Title>
        <span className="text-sm italic">
          <Mdx>{resume.peer_review_publications.subtitle}</Mdx>
        </span>
      </LeftCol>
      <RightCol>
        <ContentList
          items={publications}
          className="not-prose"
          renderDate={({ date, venue }) =>
            `${date.toFormat('yyyy/MM')} - ${venue}`
          }
          renderTitle={({ title }) => title}
          renderSubtitle={({ authors = [] }) => authors.join(', ')}
          noprinturl
        />
      </RightCol>
      <LeftCol>
        <Title as="h2">{resume.talks.title}</Title>
      </LeftCol>
      <RightCol>
        <ContentList
          items={talks}
          className="not-prose"
          renderDate={({ date }) => date.toFormat('yyyy/MM/dd')}
          renderTitle={({ title }) => title}
          renderSubtitle={({ venue }) => venue}
          noprinturl
        />
      </RightCol>
      <LeftCol>
        <Title as="h2">{resume.other_publications.title}</Title>
      </LeftCol>
      <RightCol>
        <ContentList
          items={otherPublications}
          className="not-prose"
          renderDate={({ date }) => date.toFormat('yyyy/MM')}
          renderTitle={({ title }) => title}
          renderSubtitle={({ venue }) => venue}
          noprinturl
        />
      </RightCol>
    </div>
  );
}
