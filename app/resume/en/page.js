import sortBy from 'lodash.sortby';
import clsx from 'clsx';

import listContent from '../../content/utils/listContent';
import Title, { Subtitle } from '../../../components/title';
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

export function ItemDescription({ children, className }) {
  return <Mdx>{children}</Mdx>;
}

export function LeftCol({ className, ...otherProps }) {
  return (
    <div
      className={clsx(
        'prose',
        'prose-a:no-underline hover:prose-a:underline',
        'prose-headings:font-title prose-headings:font-light *:prose-headings:m-0',
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
    <div
      className={clsx(
        'lg:col-span-2',
        'prose',
        'prose-p:text-justify',
        'prose-a:no-underline hover:prose-a:underline',
        'prose-headings:font-title prose-headings:font-light *:prose-headings:m-0',
        'prose-h1:font-extralight prose-h1:text-4xl',
        'prose-h2:font-extralight prose-h2:text-3xl',
        className
      )}
      {...otherProps}
    />
  );
}

export default async function ResumeEn({}) {
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
  const moocs = contentItems.filter(({ categories = [] }) =>
    categories.find((category) => category == 'mooc')
  );
  return (
    <div
      className={clsx('grid grid-cols-1 lg:grid-cols-[repeat(3,_32ch)] gap-4')}
    >
      <LeftCol className="not-prose">
        <Title as="h1" className="text-5xl text-blue font-title font-light">
          Clodéric Mars
        </Title>
        <Subtitle className="text-2xl font-title uppercase">
          AI Product Engineer <br />
          Tech Leader <br />
          Public Speaker
        </Subtitle>
      </LeftCol>
      <RightCol>
        <ItemDescription className="prose-p:my-2">
          {`
          Creative, enthusiastic and thoughtful software engineer & tech leader!

          Since 2006, I'm building AIs with one overarching goal:
          fostering **collaboration between Humans and AIs**.

          To bridge the gap between research and productization, I've developed a wide range of
          skills: AI and ML algorithms, applied data science, distributed cloud
          architecture, API design, product management, workshop facilitation,
          project leadership.

          Over the years my role has evolved from individual
          contributor to team leader and to managing several teams internally and in
          coordination with external stakeholders, customers, partners and
          subcontractors. As CTO of craft ai and VP Engineering of AI Redefined, I
          recruited and led teams of 15+ AI researchers, software engineers and
          data scientists in challenging deep tech startup environments.

          Presenting projects, running workshops, evangelizing prospects, giving
          technical or inspirational talks, I've accumulated a wealth of
          experience in public speaking. I've had the opportunity to present at
          several conferences in both French and English, as well as numerous
          meetups and seminars. I've also organized and moderated conferences and
          round tables.
          `}
        </ItemDescription>
      </RightCol>
      <LeftCol>
        <Title as="h2">Experience</Title>
      </LeftCol>
      <RightCol>
        <ItemTitle from="2021-02" location="Montréal, France">
          VP of Engineering @ [AI Redefined](https://www.ai-r.com)
        </ItemTitle>
        <ItemDescription>
          {`
          - Coordination of product & technological strategy, research and external collaboration efforts in line with corporate strategy and business development.
          - Recruiting and leading the research & engineering team from 5 to 16 engineers & researchers.
          - Key contribution to product and sales strategy, as well as operations: defining offers, managing the product roadmap, participating in business development.
          - Hands-on research and development of a multi-agent, human-in-the-loop reinforcement learning orchestration platform and several projects implementing it: Python, Go, Javascript, Kubernetes, reinforcement learning, machine learning, data science.
          - Coordination and contributions on multiple research collaborations including with University of Alberta (Edmonton, Canada), MILA (Montréal, Canada) and IRT SystemX (Paris Saclay, France)
         `}
        </ItemDescription>
        <ItemTitle from="2015-03" to="2020-04" location="Paris, France">
          Co-founder & CTO @ [craft ai](https://www.craft.ai/)
        </ItemTitle>
        <ItemDescription>
          Building upon some prototypes we built at MASA Group, we raised a 2 M€
          seed round and created craft ai, an Enterprise AI API to build self
          learning AIs able to collaborate with Humans. After 5 years we had
          raised a total of 9 M€ and reached a growth stage, **powering a dozen
          AIs** for our entreprise customers such as Total, EDF and Dassault
          Aviation. As CTO, I was particularly **in charge of the product & tech
          activities**, recruiting and leading a team of ~15 Machine Learning
          researchers, software engineers and data scientists while staying
          hands-on in R&D, biz dev and evangelism. I also participated in every
          aspects of the company inception and development: fund raising,
          business model, positioning, business plan...
        </ItemDescription>
        <ItemTitle from="2012-01" to="2015-02" location="Paris, France">
          Lead Software Engineer & Product Manager @ [MASA
          Group](https://masasim.com/)
        </ItemTitle>
        <ItemDescription>
          I was recruited to lead a product development team at MASA Group, a
          leading AI company, founded by AI researchers in 1996. I managed a
          team of ~5 developers distributed between Paris and Munich and later
          also took the Product Management role after ~2 years. We developed
          from scratch an AI middleware enabling non experts to create and
          control AIs in simulations and video games. I participated in the
          business development and global strategy for this product in
          collaboration with the company C-Level and coordinated the effort with
          the sales and other R&D teams.
        </ItemDescription>
        <ItemTitle from="2009-03" to="2011-12" location="Rennes, France">
          R&D Software Engineer @ [Golaem](http://golaem.com/)
        </ItemTitle>
        <ItemDescription>
          I came back to the lab where I interned during my master's at
          [INRIA](https://www.inria.fr/) to join the initial R&D team of Golaem,
          the _spin off_ they co-founded. I took part in the **industrialization
          of the initial crowd simulation academic prototype** where I was in
          charge of the navigation (path finding & steering) module. While we
          built this rock solid foundations we prototyped its usage in various
          industries, I had the opportunity to coordinate an integration project
          with Dassault Systèmes and also work on a train passenger simulation
          project with SNCF. This core technology was used to build Golaem's
          main product, the leading crowd simulation tool for the film industry
          being used for special effects in live action and animation.
        </ItemDescription>
        <ItemTitle from="2006-07" to="2009-02" location="Rennes, France">
          Software Engineer @ [Open](https://www.open.global/fr)
        </ItemTitle>
        <ItemTitle
          from="2006-07"
          to="2008-09"
          location="Rennes, France"
          as="h4"
        >
          Java/JEE architect
        </ItemTitle>
        <ItemDescription>
          I joined a small project team that developed the first user generated
          content feature for pagesjaunes.fr. I worked on the first version of
          the backend and was in charge of the collaboration with eXo Platform
          who provided the moderation backoffice.
        </ItemDescription>
        <ItemTitle from="2006-07" to="2008-07" as="h4">
          GIS/3D authoring toolchain developer
        </ItemTitle>
        <ItemDescription>
          I was hired by Teamlog (now part of Open) to be an initial member of a
          team that grew from 4 to ~20, we developed an authoring toolchain to
          create virtual cities from GIS data and geolocalized photos as a part
          of a larger project orchestrated by Orange Labs. Our toolchain was
          used to build virtual versions of Paris and Barcelona.
        </ItemDescription>
        <ItemTitle from="2006-02" to="2006-09" location="Rennes, France">
          AI Research Intern @ [INRIA](https://www.inria.fr)
        </ItemTitle>
        <ItemDescription>
          I was a member of the [Bunraku
          project-team](https://www.irisa.fr/bunraku/), advised by [Fabrice
          Lamarche](https://scholar.google.ca/citations?user=PsFvEHQAAAAJ&hl=en).
          I worked in the field of crowd simulation on environment
          representation using semantic & topologic abstraction of navigation
          graphs.
        </ItemDescription>
      </RightCol>
      <LeftCol>
        <Title as="h2">Education</Title>
      </LeftCol>
      <RightCol>
        <ItemTitle from="2001-09" to="2006-06" location="Rennes, France">
          **MEng (Diplôme d'ingénieur) in Computer Science** - [_INSA de
          Rennes_](https://www.insa-rennes.fr)
        </ItemTitle>
        <ItemDescription>
          2 years of general scientific and engineering courses followed by 3
          years of computer science specialization.
        </ItemDescription>
        <ItemTitle from="2005-09" to="2006-06" location="Rennes, France">
          **MSc in Artificial Intelligence** - [_Université de Rennes
          1_](https://www.univ-rennes.fr)
        </ItemTitle>
        <ItemDescription>
          Academia-oriented 1 year curriculum with a focus on Artificial
          Intelligence, including machine learning and symbolic reasoning, in
          collaboration with [INRIA](https://www.inria.fr).
        </ItemDescription>
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
        <Title as="h2">Talks</Title>
      </LeftCol>
      <RightCol>
        <ContentList
          items={talks}
          className="not-prose"
          renderDate={({ date }) => date.toFormat('yyyy/MM/dd')}
          renderTitle={({ short_title, title }) => short_title || title}
          renderSubtitle={({ venue }) => `@ ${venue}`}
        />
      </RightCol>
      <LeftCol>
        <Title as="h2">Peer-reviewed publications</Title>
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
    </div>
  );
}
