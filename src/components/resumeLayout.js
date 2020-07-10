import React from 'react';
import Layout from './layout';
import styled from '@emotion/styled';
import Container from './container';
import Link from './link';
import {
  PRIMARY,
  BG_COLOR_1,
  BG_COLOR_1_GRADIENT,
  BG_COLOR_2,
  BG_COLOR_2_GRADIENT,
  BLACK,
  WHITE,
  BOX_SHADOW
} from '../theme/colors';
import { graphql, useStaticQuery } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedinIn,
  faGithub,
  faResearchgate
} from '@fortawesome/free-brands-svg-icons';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';

const ResumePage = styled.article`
  position: relative;

  background: ${WHITE};
  color: ${BLACK};

  padding: 2em;
  margin: 0.5em 0;

  .anchor {
    fill: ${BLACK};
  }

  header {
    h1 {
      color: ${PRIMARY};
    }
    .description {
      font-size: 1.1em;
    }
  }

  .aside {
    float: right;

    top: 0;
    right: 0;

    margin-left: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .aside > div {
    background: ${BG_COLOR_1_GRADIENT};
    color: ${WHITE};
    @media print {
      background: ${BG_COLOR_1};
      -webkit-print-color-adjust: exact !important;
    }
    &:nth-child(even) {
      background: ${BG_COLOR_2_GRADIENT};
      @media print {
        background: ${BG_COLOR_2};
      }
    }

    ${BOX_SHADOW};
    margin: 1em;
    padding: 0.3em;

    font-style: normal;
    font-size: 0.9em;

    h2 {
      text-align: center;
      border: none;
      margin-block-start: 0.5em;
      margin-block-end: 0.5em;
    }

    dl {
      margin-block-start: 0.5em;
      margin-block-end: 0.5em;

      display: grid;
      grid-template-columns: 3ch auto;
      row-gap: 0.5em;
      place-items: center stretch;

      dt {
        grid-column: 1 / span 1;
        text-align: center;
      }
      dd {
        grid-column: 2 / span 1;
        text-align: right;
      }
    }
  }

  h2 {
    border-top: 1px ${PRIMARY} solid;
    margin-top: 1em;
    padding-top: 1em;
  }

  h2:first-of-type {
    border-top: none;
    padding-top: 0;
  }
`;

const Aside = [
  {
    title: 'Contact',
    items: [
      {
        hidden: ({ email }) => !email,
        label: () => (
          <span role="img" aria-label="Email">
            ✉️
          </span>
        ),
        value: ({ email }) => <Link href={`mailto:${email}`}>{email}</Link>
      },
      {
        hidden: ({ phone }) => !phone,
        label: () => (
          <span role="img" aria-label="Phone">
            📱
          </span>
        ),
        value: ({ phone }) => <span>{phone}</span>
      },
      {
        hidden: ({ address }) => !address,
        label: () => (
          <span role="img" aria-label="Address">
            🏡
          </span>
        ),
        value: ({ address }) => (
          <span
            dangerouslySetInnerHTML={{
              __html: address.split('\n').join('<br/>')
            }}
          />
        )
      }
    ]
  },
  {
    title: 'Interesting links',
    items: [
      {
        label: () => (
          <FontAwesomeIcon icon={faNewspaper} aria-label="LinkedIn" />
        ),
        value: ({ siteUrl }) => <Link href={siteUrl}>{siteUrl}</Link>
      },
      {
        label: () => (
          <FontAwesomeIcon icon={faLinkedinIn} aria-label="LinkedIn" />
        ),
        value: ({ linkedin }) => (
          <Link
            title="My LinkedIn profile"
            href={`https://www.linkedin.com/in/${linkedin}`}
          >
            https://www.linkedin.com/in/{linkedin}
          </Link>
        )
      },
      {
        label: () => <FontAwesomeIcon icon={faGithub} aria-label="Github" />,
        value: ({ github }) => (
          <Link title="My Github profile" href={`https://github.com/${github}`}>
            https://github.com/{github}
          </Link>
        )
      },
      {
        label: () => (
          <FontAwesomeIcon icon={faResearchgate} aria-label="Research Gate" />
        ),
        value: ({ researchgate }) => (
          <Link
            title="My Research Gate profile"
            href={`https://www.researchgate.net/profile/{researchgate}`}
          >
            https://www.researchgate.net/profile/{researchgate}
          </Link>
        )
      }
    ]
  },
  {
    title: 'Language Skills',
    items: [
      {
        label: () => (
          <span role="img" aria-label="French">
            🇫🇷
          </span>
        ),
        value: () => <>Native</>
      },
      {
        label: () => (
          <span role="img" aria-label="English">
            🇬🇧
          </span>
        ),
        value: () => (
          <>
            Proficient
            <br />
            <small>
              <em>Intl working environment xp</em>
            </small>
          </>
        )
      }
    ]
  }
];

const ResumeLayout = ({ children, pageContext }) => {
  const { header } = pageContext.frontmatter;
  const { site, data } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author
            siteUrl
          }
        }
        data: dataYaml {
          contact {
            address
            email
            phone
          }
          social {
            linkedin
            github
            researchgate
          }
        }
      }
    `
  );
  const asideProps = {
    ...data.contact,
    ...data.social,
    siteUrl: site.siteMetadata.siteUrl
  };
  return (
    <Layout>
      <Container>
        <ResumePage>
          <div className="aside">
            {Aside.map(({ title, items }, index) => (
              <div key={index}>
                <h2>{title}</h2>
                <dl>
                  {items.map(({ hidden, label, value }) =>
                    hidden && hidden(asideProps) ? null : (
                      <React.Fragment key={index}>
                        <dt>{label(asideProps)}</dt>
                        <dd>{value(asideProps)}</dd>
                      </React.Fragment>
                    )
                  )}
                </dl>
              </div>
            ))}
          </div>
          <header>
            <h1>{site.siteMetadata.author}</h1>
            <p className="description">{header}</p>
          </header>
          <div>{children}</div>
        </ResumePage>
      </Container>
    </Layout>
  );
};

export default ResumeLayout;
