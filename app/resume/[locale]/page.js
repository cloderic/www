import clsx from 'clsx';
import { defineMessage } from '@formatjs/intl';

import { Mdx } from '../../../components/markdown';
import ContentList from '../../../components/contentList';
import PrintButton from '../../../components/printButton';
import Title, { Subtitle } from '../../../components/title';
import getIntl from '../../../i18n/i18n';
import formatDateRange from '../../../components/helpers/formatDateRange';
import { Fragment } from 'react';
import loadResume from '../loadResume';
import Link from '../../../components/link';

export async function generateMetadata({ params: { locale } }) {
  const resume = await loadResume(locale);
  return {
    title: resume.page_title,
    alternates: {
      canonical: `/resume/${locale}`,
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

function ItemTitle({
  children,
  as = 'h3',
  from,
  to = null,
  location = null,
  intl
}) {
  const dateRange = formatDateRange({ from, to, intl });
  return (
    <>
      <Title as={as}>
        <Mdx>{children}</Mdx>
      </Title>
      <Subtitle className="text-blue-light text-xs">
        {dateRange}
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

export default async function Resume({ params: { locale } }) {
  const intl = await getIntl(locale);

  const saveAtsResumeMessage = defineMessage({
    id: 'actions.saveAtsResume',
    defaultMessage: 'Save ATS friendly version...'
  });

  const resume = await loadResume(locale);

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
          {resume.name}
        </Title>
        <Subtitle className="text-xl font-title">{resume.job_title}</Subtitle>
        <address className="text-sm flex flex-col gap-2 my-4">
          {resume.contact.mail ? (
            <div>
              <Mdx>{resume.contact.mail}</Mdx>
            </div>
          ) : null}
          {resume.contact.phone ? (
            <div>
              <Mdx>{resume.contact.phone}</Mdx>
            </div>
          ) : null}
          <div>
            <Mdx>{resume.contact.address}</Mdx>
          </div>
        </address>
        <PrintButton intl={intl} />
        <div className="mt-2">
          <Link
            href={`/resume/${locale}/docx`}
            className="bg-pink text-blue py-2 px-4 rounded-full text-sm print:hidden"
          >
            {intl.formatMessage(saveAtsResumeMessage)}
          </Link>
        </div>
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
              <ItemTitle from={from} to={to} location={location} intl={intl}>
                {title}
              </ItemTitle>
              <ItemDescription>{description}</ItemDescription>
              {items.map(
                ({ from, to, location, title, description }, index) => (
                  <Fragment key={index}>
                    <ItemTitle
                      from={from}
                      to={to}
                      location={location}
                      as="h4"
                      intl={intl}
                    >
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
              <ItemTitle
                as="h4"
                from={from}
                to={to}
                location={location}
                intl={intl}
              >
                {title}
              </ItemTitle>
              <ItemDescription>{description}</ItemDescription>
              {items.map(
                ({ from, to, location, title, description }, index) => (
                  <Fragment key={index}>
                    <ItemTitle
                      from={from}
                      to={to}
                      location={location}
                      as="h4"
                      intl={intl}
                    >
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
              <ItemTitle from={from} to={to} location={location} intl={intl}>
                {title}
              </ItemTitle>
              <ItemDescription>{description}</ItemDescription>
              {items.map(
                ({ from, to, location, title, description }, index) => (
                  <Fragment key={index}>
                    <ItemTitle
                      from={from}
                      to={to}
                      location={location}
                      as="h4"
                      intl={intl}
                    >
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
          items={resume.education.moocs.items}
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
          items={resume.peer_review_publications.items}
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
          items={resume.talks.items}
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
          items={resume.other_publications.items}
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
