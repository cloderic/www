import React from 'react';
import Layout from './layout';
import styled from '@emotion/styled';
import Container from './container';
import Link from './link';
import {
  PRIMARY,
  BG_COLOR_1,
  BG_COLOR_1_GRADIENT,
  BLACK,
  WHITE,
  BOX_SHADOW
} from '../theme/colors';
import { graphql, useStaticQuery } from 'gatsby';

const ResumePage = styled.article`
  position: relative;

  background: ${WHITE};
  color: ${BLACK};

  padding: 2em;
  margin: 0.5em 0;

  .anchor {
    fill: ${BLACK};
  }

  header > .description {
    font-size: 1.1em;
  }

  & > address {
    position: absolute;
    top: 0;
    right: 0;

    background: ${BG_COLOR_1_GRADIENT};
    color: ${WHITE};
    @media print {
      background: ${BG_COLOR_1};
      -webkit-print-color-adjust: exact !important;
    }

    ${BOX_SHADOW};
    margin: 1em;
    padding: 0.3em;

    font-style: normal;
    font-size: 0.9em;

    display: flex;
    flex-direction: column;

    .item {
      display: inline-flex;
      align-items: center;

      margin: 0.3em;

      dt {
        flex: 0 0;
        width: 3ch;
        text-align: center;
      }
      dd {
        flex: 1 0;
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

const ResumeLayout = ({ children }) => {
  const result = useStaticQuery(
    graphql`
      query {
        data: dataYaml {
          contact {
            address
            email
            phone
          }
        }
      }
    `
  );
  console.log('result', result);
  const data = result.data;
  return (
    <Layout>
      <Container>
        <ResumePage>
          <header>
            <h1>Clodéric Mars</h1>
            <p className="description">
              AI Product Engineer / Tech Leader / Public Speaker
            </p>
          </header>
          <address>
            {data.contact.email && (
              <div className="item">
                <dt>
                  <span role="img" aria-label="email">
                    ✉️
                  </span>
                </dt>
                <dd>
                  <Link href={`mailto:${data.contact.email}`}>
                    {data.contact.email}
                  </Link>
                </dd>
              </div>
            )}
            <div className="item">
              <dt>
                <span role="img" aria-label="portfolio">
                  📚
                </span>
              </dt>
              <dd>
                <Link href="https://www.cloderic.com">
                  https://www.cloderic.com
                </Link>
              </dd>
            </div>
            {data.contact.phone && (
              <div className="item">
                <dt>
                  <span role="img" aria-label="telephone">
                    📱
                  </span>
                </dt>
                <dd>{data.contact.phone}</dd>
              </div>
            )}
            {data.contact.address && (
              <div className="item">
                <dt>
                  <span role="img" aria-label="address">
                    🏡
                  </span>
                </dt>
                <dd
                  dangerouslySetInnerHTML={{
                    __html: data.contact.address.split('\n').join('<br/>')
                  }}
                ></dd>
              </div>
            )}
          </address>
          <div>{children}</div>
        </ResumePage>
      </Container>
    </Layout>
  );
};

export default ResumeLayout;
