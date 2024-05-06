import clsx from 'clsx';
import { DateTime } from 'luxon';

import Title, { Subtitle } from '../../components/title';
import PrintButton from '../../components/printButton';
import { Mdx } from '../../components/markdown';
import ContentList from '../../components/contentList';

function ItemTitle({ children, as = 'h3', from, to = null, location = null }) {
  const fromDate = DateTime.fromISO(from);
  const toDate = to != null ? DateTime.fromISO(to) : null;
  return (
    <>
      <Subtitle className="text-blue-light text-xs" top>
        {toDate
          ? `from ${fromDate.toFormat('yyyy/MM')} to ${toDate.toFormat(
              'yyyy/MM'
            )}`
          : `since ${fromDate.toFormat('yyyy/MM')}`}
        {location ? ` - ${location}` : null}
      </Subtitle>
      <Title as={as}>
        <Mdx>{children}</Mdx>
      </Title>
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

export default async function Resume({
  resume,
  publications,
  talks,
  otherPublications,
  moocs
}) {
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
          ({ from, to, location, title, description, items = [] }) => (
            <section className="break-inside-avoid">
              <ItemTitle from={from} to={to} location={location}>
                {title}
              </ItemTitle>
              <ItemDescription>{description}</ItemDescription>
              {items.map(({ from, to, location, title, description }) => (
                <>
                  <ItemTitle from={from} to={to} location={location} as="h4">
                    {title}
                  </ItemTitle>
                  <ItemDescription>{description}</ItemDescription>
                </>
              ))}
            </section>
          )
        )}
      </RightCol>
      <LeftCol>
        <Title as="h2">{resume.education.title}</Title>
      </LeftCol>
      <RightCol>
        {resume.education.items.map(
          ({ from, to, location, title, description, items = [] }) => (
            <section className="break-inside-avoid">
              <ItemTitle from={from} to={to} location={location}>
                {title}
              </ItemTitle>
              <ItemDescription>{description}</ItemDescription>
              {items.map(({ from, to, location, title, description }) => (
                <>
                  <ItemTitle from={from} to={to} location={location} as="h4">
                    {title}
                  </ItemTitle>
                  <ItemDescription>{description}</ItemDescription>
                </>
              ))}
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
