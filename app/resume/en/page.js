import sortBy from 'lodash.sortby';
import clsx from 'clsx';

import listContent from '../../content/utils/listContent';
import Title, { Subtitle } from '../../../components/title';
import Link from '../../../components/link';
import PrintButton from '../../../components/printButton';
import { Mdx } from '../../../components/markdown';
import ContentList from '../../../components/contentList';
const { DateTime } = require('luxon');

export const metadata = {
  title: 'Resume',
  alternates: {
    canonical: '/resume/en'
  }
};

export function ItemTitle({
  children,
  as = 'h3',
  from,
  to = null,
  location = null
}) {
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

export function ItemDescription({ children }) {
  return <Mdx>{children}</Mdx>;
}

export function LeftCol({ className, ...otherProps }) {
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

export function RightCol({ className, ...otherProps }) {
  return (
    <LeftCol
      className={clsx('lg:col-span-2', 'prose-p:text-justify', className)}
      {...otherProps}
    />
  );
}

export default async function ResumeEn({}) {
  const contentItems = sortBy(
    await listContent({ parseFrontmatter: true }),
    'date'
  ).reverse();
  const publications = contentItems.filter(
    ({ categories = [] }) =>
      categories.find((category) => category == 'publication') &&
      categories.find((category) => category == 'resume')
  );
  const talks = contentItems.filter(
    ({ categories = [] }) =>
      categories.find((category) => category == 'talk') &&
      !categories.find((category) => category == 'publication') &&
      categories.find((category) => category == 'resume')
  );
  const moocs = contentItems.filter(({ categories = [] }) =>
    categories.find((category) => category == 'mooc')
  );
  return (
    <div
      className={clsx(
        'grid grid-cols-1 lg:grid-cols-[repeat(3,_32ch)] gap-4 print:grid-cols-1 print:max-w-[18cm]'
      )}
    >
      <LeftCol className="not-prose">
        <Title as="h1" className="text-5xl text-blue font-title font-light">
          Clodéric Mars
        </Title>
        <Subtitle className="text-xl font-title">
          AI Product Engineer & Tech Leader, turning research prototypes into
          enterprise products since 2006
        </Subtitle>
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
        <ItemDescription className="">
          {`
          **Creative, enthusiastic and thoughtful software engineer & tech leader!**

          Since 2006, I'm building AIs with one overarching goal:
          fostering **collaboration between Humans and AIs**.

          To bridge the gap between research and productization, I've developed a wide range of
          skills: AI and ML algorithms, applied data science, distributed cloud
          architecture, API design, product & tech roadmap management, workshop facilitation,
          customer & partners relationships.

          Over the years my role has evolved from individual
          contributor, to team leader, to managing several teams internally and in
          coordination with external stakeholders. As CTO of craft ai and VP Engineering of AI Redefined, I
          recruited and led teams of 15+ AI researchers, software engineers and
          data scientists in challenging deep tech startup environments.

          I have experience working in multi-cultural and international environments with full proficiency in both French, my native language, and English.
          `}
        </ItemDescription>
      </RightCol>
      <LeftCol>
        <Title as="h2">Experience</Title>
      </LeftCol>
      <RightCol>
        <section className="break-inside-avoid">
          <ItemTitle from="2021-02" location="Montréal, France">
            VP of Engineering - [**AI Redefined**](https://www.ai-r.com)
          </ItemTitle>
          <ItemDescription>
            {`
          - Coordination of product & technological strategy, research and external collaboration efforts in line with corporate strategy and business development.
          - Recruiting and leading the research & engineering team from 5 to 16 engineers & researchers.
          - Key contribution to product and sales strategy, as well as operations: defining offers, managing the product roadmap, participating in business development, setuping technological & research partnerships.
          - Hands-on research and development of a multi-agent, human-in-the-loop reinforcement learning orchestration platform and several projects implementing it: Python, Go, Javascript, Kubernetes, Reinforcement Learning, Machine Learning, Data Science.
          - Coordination and contributions on multiple collaborations including with [Thales](https://www.thalesgroup.com/), [CAE](https://www.cae.com/), [NAV CANADA](https://www.navcanada.ca/), [University of Alberta](https://www.ualberta.ca/), [MILA](https://mila.quebec/) and [IRT SystemX](https://www.irt-systemx.fr/)
         `}
          </ItemDescription>
          <ItemTitle from="2020-05" to="2021-01" location="Paris, France">
            Freelance AI engineer
          </ItemTitle>
          <ItemTitle from="2020-05" to="2021-01" as="h4">
            AI Product Engineer - **AI Redefined**
          </ItemTitle>
          <ItemDescription>
            {`
          - Technical presales
          - Open source product release coordination
          `}
          </ItemDescription>
          <ItemTitle from="2020-05" to="2021-01" as="h4">
            Volunteering Data Scientist - [**APHP**](https://www.aphp.fr)
          </ItemTitle>
          <ItemDescription>
            Data extraction and preparation for epidemiological studies of the
            first COVID-19 patients in Paris hospitals: Python, PostgreSQL,
            Apache Spark, data science
          </ItemDescription>
        </section>
        <section className="break-inside-avoid">
          <ItemTitle from="2015-03" to="2020-04" location="Paris, France">
            Co-founder & CTO - [**craft ai**](https://www.craft.ai/)
          </ItemTitle>
          <ItemDescription>
            {`
          - Development of the company from 7 to 20+ employees, participation in fundraising for a total of ~9M€, deployment of ~10 AI projects within large companies including [EDF](https://www.edfenergy.com/), [Total](https://www.totalenergies.fr) and [Dassault Aviation](https://www.dassault-aviation.com).
          - Leading product development, R&D and Customer Success teams.
          - Hands-on development of an explainable AI SaaS specialized in time series: Rust, Javascript, Python, Kafka, Redis, Kubernetes, Docker, machine learning, data science.
          `}
          </ItemDescription>
        </section>
        <section className="break-inside-avoid">
          <ItemTitle from="2012-01" to="2015-02" location="Paris, France">
            Lead Software Engineer & Product Manager - [**MASA
            Group**](https://masasim.com/)
          </ItemTitle>
          <ItemDescription>
            {`
          - Leading a product development team (~5 software engineers) based in Paris and Munich.
          - Managing an AI product, a middleware enabling non-specialists to create and control AIs for simulations and video games: Technical pre-sales, participation to business development, speaker at several international conferences (e.g. GDC), coordination with the research team.
          - Development of the behavior tree and spatial reasoning engine: C++, Computational Geometry, Game AI, Unity, Ogre3d, VBS2/3
          `}
          </ItemDescription>
        </section>
        <section className="break-inside-avoid">
          <ItemTitle from="2010-01" to="2011-12" location="Rennes, France">
            R&D Software Engineer - [**Golaem**](http://golaem.com/)
          </ItemTitle>
          <ItemDescription>
            {`
          - Development of navigation engine for virtual crowds: C++, Computational Geometry, Game AI.
          - Management of a collaborative R&D project with [Dassault Systèmes](https://www.3ds.com) and [CNRS](https://www.cnrs.fr), for the "real-time" population of a 3d virtual city.
          `}
          </ItemDescription>
        </section>
        <section className="break-inside-avoid">
          <ItemTitle from="2010-01" to="2011-12" location="Rennes, France">
            R&D Software Engineer - [**INRIA**](https://www.inria.fr)
          </ItemTitle>
          <ItemDescription>
            {`
          - Development of a 3d simulation engine and industrialization of a navigation engine for virtual crowds: C++, Qt, Ogre3d, Computational Geometry, Game AI.
          `}
          </ItemDescription>
        </section>
        <section className="break-inside-avoid">
          <ItemTitle from="2006-07" to="2009-02" location="Rennes, France">
            Software Engineer - [**Teamlog** (acquired by
            Open)](https://www.open.global)
          </ItemTitle>
          <ItemDescription>
            {`
          - Development of a tool chain to create virtual cities for [Orange](https://www.orange.fr): C++, Qt, Open Scene Graph, PostGIS, Geographic Information Systems, Computational Geometry.
          - Development of a user contribution system for [PagesJaunes.fr](https://www.pagesjaunes.fr): Java/J2E.
          `}
          </ItemDescription>
        </section>
        <section className="break-inside-avoid">
          <ItemTitle from="2006-02" to="2006-09" location="Rennes, France">
            AI Research Intern - [**INRIA**](https://www.inria.fr)
          </ItemTitle>
          <ItemDescription>
            I was a member of the [Bunraku
            project-team](https://www.irisa.fr/bunraku/), advised by Fabrice
            Lamarche. I worked in the field of crowd simulation on environment
            representation using semantic & topologic abstraction of navigation
            graphs.
          </ItemDescription>
        </section>
      </RightCol>
      <LeftCol>
        <Title as="h2">Education</Title>
      </LeftCol>
      <RightCol>
        <section className="break-inside-avoid">
          <ItemTitle from="2001-09" to="2006-06" location="Rennes, France">
            **MEng (Diplôme d'ingénieur) in Computer Science** - [_INSA de
            Rennes_](https://www.insa-rennes.fr)
          </ItemTitle>
          <ItemDescription>
            2 years of general scientific and engineering courses followed by 3
            years of computer science specialization.
          </ItemDescription>
        </section>
        <section className="break-inside-avoid">
          <ItemTitle from="2005-09" to="2006-06" location="Rennes, France">
            **MSc in Artificial Intelligence** - [_Université de Rennes
            1_](https://www.univ-rennes.fr)
          </ItemTitle>
          <ItemDescription>
            Academia-oriented 1 year curriculum with a focus on Artificial
            Intelligence, including machine learning and symbolic reasoning, in
            collaboration with [INRIA](https://www.inria.fr).
          </ItemDescription>
        </section>
        <Title as="h3">MOOCS</Title>
        <ContentList
          items={moocs}
          className="not-prose"
          renderDate={({ date }) => `${date.toFormat('yyyy/MM')}`}
          renderTitle={({ title, short_title, organization }) => (
            <>
              <strong>{organization}</strong> - {short_title || title}
            </>
          )}
          renderSubtitle={({ topics = [] }) => topics.join(', ')}
        />
      </RightCol>
      <LeftCol>
        <Title as="h2">Peer-reviewed publications</Title>
        <p className="text-sm italic">
          Full list on{' '}
          <Link href="https://scholar.google.com/citations?user=fvCC1rwAAAAJ">
            Google Scholar
          </Link>
        </p>
      </LeftCol>
      <RightCol>
        <ContentList
          items={publications}
          className="not-prose"
          renderDate={({ date, venue }) =>
            `${date.toFormat('yyyy/MM')} - ${venue}`
          }
          renderTitle={({ short_title, title }) => short_title || title}
          renderSubtitle={({ authors = [] }) => authors.join(', ')}
        />
      </RightCol>
      <LeftCol>
        <Title as="h2">Talks</Title>
      </LeftCol>
      <RightCol>
        <ContentList
          items={talks}
          className="not-prose"
          renderDate={({ date }) => date.toFormat('yyyy/MM/dd')}
          renderTitle={({ short_title, title }) => short_title || title}
          renderSubtitle={({ venue }) => venue}
        />
      </RightCol>
    </div>
  );
}
