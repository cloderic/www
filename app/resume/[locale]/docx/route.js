import {
  Document,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  TabStopType,
  TabStopPosition,
  Packer,
  ExternalHyperlink,
  SectionType
} from 'docx';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import slugify from '@sindresorhus/slugify';

import formatDateRange from '../../../../components/helpers/formatDateRange';
import getIntl from '../../../../i18n/i18n';
import loadResume from '../../loadResume';
import getBaseUrl from '../../../getBaseUrl';
import twConfig from '../../../../tailwind.config';

const mdProcessor = unified().use(remarkParse);

const _createDocxFromMarkdown = ({
  enableParagraphs = true,
  ...docxProps
} = {}) => {
  return ({ type, children, value, url, ...otherProps }) => {
    switch (type) {
      case 'root':
        return children
          .map(_createDocxFromMarkdown({ enableParagraphs, ...docxProps }))
          .flat();
      case 'paragraph':
        if (enableParagraphs) {
          return [
            new Paragraph({
              ...docxProps,
              children: children
                .map(_createDocxFromMarkdown({ enableParagraphs }))
                .flat()
            })
          ];
        }
        return children
          .map(_createDocxFromMarkdown({ enableParagraphs, ...docxProps }))
          .flat();
      case 'text':
        return [
          new TextRun({
            ...docxProps,
            text: value
          })
        ];
      case 'strong':
        return children
          .map(_createDocxFromMarkdown({ enableParagraphs, bold: true }))
          .flat();
      case 'emphasis':
        return children
          .map(_createDocxFromMarkdown({ enableParagraphs, italics: true }))
          .flat();
      case 'link':
        return [
          new ExternalHyperlink({
            ...docxProps,
            link: url,
            children: children
              .map(
                _createDocxFromMarkdown({
                  enableParagraphs,
                  style: 'Hyperlink'
                })
              )
              .flat()
          })
        ];
      case 'list':
        return children
          .map(_createDocxFromMarkdown({ enableParagraphs, ...docxProps }))
          .flat();
      case 'listItem':
        return children
          .map(
            _createDocxFromMarkdown({
              enableParagraphs,
              bullet: {
                level: 0
              },
              ...docxProps
            })
          )
          .flat();
      default:
        throw Error(`unsupported markdown node of type ${type}`);
    }
  };
};

function createDocxFromMarkdown(markdown, options = {}) {
  const parseTree = mdProcessor.parse(markdown);
  return _createDocxFromMarkdown(options)(parseTree);
}

function createHeading1(text) {
  return [
    new Paragraph({
      text: text,
      heading: HeadingLevel.HEADING_1,
      keepNext: true
    })
  ];
}

function createHeading2(text) {
  return [
    new Paragraph({
      text: text,
      heading: HeadingLevel.HEADING_2,
      keepNext: true
    })
  ];
}

function createItemTitle(title, from, to, location, intl) {
  const children = [
    ...createDocxFromMarkdown(title, {
      bold: true,
      enableParagraphs: false
    }),
    new TextRun({
      text: `\t${formatDateRange({ from, to, intl })}`,
      bold: true
    })
  ];
  if (location != null) {
    children.push(
      new TextRun({
        text: `${location}`,
        italics: true,
        break: 1
      })
    );
  }
  return [
    new Paragraph({
      tabStops: [
        {
          type: TabStopType.RIGHT,
          position: TabStopPosition.MAX,
          heading: HeadingLevel.HEADING_3
        }
      ],
      children
    })
  ];
}

export async function GET(request, { params: { locale } }) {
  const intl = await getIntl(locale);
  const resume = await loadResume(locale);

  const document = new Document({
    creator: resume.name,
    title: resume.page_title,
    styles: {
      default: {
        title: {
          run: {
            size: '28pt',
            color: twConfig.theme.colors.blue.lighter,
            bold: true
          }
        },
        heading1: {
          run: {
            size: '20pt',
            color: twConfig.theme.colors.blue.DEFAULT,
            bold: true
          }
        },
        heading2: {
          run: {
            size: '16pt',
            color: twConfig.theme.colors.blue.DEFAULT,
            bold: true
          }
        },
        heading3: {
          run: {
            size: '14pt',
            color: twConfig.theme.colors.blue.DEFAULT,
            bold: true
          }
        },
        document: {
          run: {
            size: '11pt',
            font: 'Calibri'
          },
          paragraph: {
            spacing: {
              after: 120
            }
          }
        }
      },
      paragraphStyles: [
        {
          id: 'contact',
          name: 'Contact',
          basedOn: 'Normal',
          next: 'Normal',
          run: {
            size: '9pt',
            color: twConfig.theme.colors.slate['400']
          }
        }
      ]
    },
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            heading: HeadingLevel.TITLE,
            children: [
              new TextRun({
                text: resume.name
              }),
              new TextRun({
                text: resume.job_title,
                size: '20pt',
                break: 1
              })
            ]
          }),
          new Paragraph({
            style: 'contact',
            children: [
              new TextRun({
                text: 'Phone: \t'
              }),
              new TextRun({
                text: resume.contact.phone
              }),
              new TextRun({
                text: 'Email: \t',
                break: 1
              }),
              new TextRun({
                text: resume.contact.mail
              }),
              new TextRun({
                text: 'Address: \t',
                break: 1
              }),
              new TextRun({
                text: resume.contact.address
              }),
              new TextRun({
                text: 'Website: \t',
                break: 1
              }),
              new ExternalHyperlink({
                children: [
                  new TextRun({
                    text: getBaseUrl().toString(),
                    style: 'Hyperlink'
                  })
                ],
                link: getBaseUrl().toString()
              }),
              new TextRun({
                text: 'LinkedIn: \t',
                break: 1
              }),
              new ExternalHyperlink({
                children: [
                  new TextRun({
                    text: resume.contact.linkedIn,
                    style: 'Hyperlink'
                  })
                ],
                link: resume.contact.linkedIn
              })
            ]
          }),
          ...createDocxFromMarkdown(resume.intro)
        ]
      },
      {
        properties: { type: SectionType.CONTINUOUS },
        children: [
          ...createHeading1(resume.experiences.title),
          ...resume.experiences.items
            .map(({ from, to, location, title, description }) => [
              ...createItemTitle(title, from, to, location, intl),
              ...createDocxFromMarkdown(description)
            ])
            .flat(),
          ...createHeading2(resume.experiences.more.title),
          ...resume.experiences.more.items
            .map(({ from, to, location, title, description }) => [
              ...createItemTitle(title, from, to, location, intl),
              ...createDocxFromMarkdown(description)
            ])
            .flat()
        ]
      },
      {
        properties: { type: SectionType.CONTINUOUS },
        children: [
          ...createHeading1(resume.education.title),
          ...resume.education.items
            .map(({ from, to, location, title, description }) => [
              ...createItemTitle(title, from, to, location, intl),
              ...createDocxFromMarkdown(description)
            ])
            .flat(),
          ...createHeading2(resume.education.moocs.title),
          ...resume.education.moocs.items
            .map(({ date, title, organization, topics }) => [
              new Paragraph({
                tabStops: [
                  {
                    type: TabStopType.RIGHT,
                    position: TabStopPosition.MAX,
                    heading: HeadingLevel.HEADING_3
                  }
                ],
                children: [
                  new TextRun({
                    text: `${organization}`,
                    bold: true
                  }),
                  new TextRun({
                    text: ` ${title}`
                  }),
                  new TextRun({
                    text: `\t${date.toFormat('yyyy/MM')}`,
                    bold: true
                  }),
                  new TextRun({
                    text: topics.join(', '),
                    italics: true,
                    break: 1
                  })
                ]
              })
            ])
            .flat()
        ]
      },
      {
        properties: { type: SectionType.NEXT_PAGE },
        children: [
          ...createHeading1(resume.peer_review_publications.title),
          ...createDocxFromMarkdown(resume.peer_review_publications.sub_title),
          ...resume.peer_review_publications.items
            .map(({ date, venue, title, authors }) => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: title,
                    bold: true
                  }),
                  new TextRun({
                    text: venue,
                    bold: true,
                    break: 1
                  }),
                  new TextRun({
                    text: ` (${date.toFormat('yyyy/MM')})`
                  }),
                  new TextRun({
                    text: authors.join(', '),
                    italics: true,
                    break: 1
                  })
                ]
              })
            ])
            .flat(),
          ...createHeading1(resume.talks.title),
          ...resume.talks.items
            .map(({ date, venue, title }) => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: title,
                    bold: true
                  }),
                  new TextRun({
                    text: venue,
                    bold: true,
                    break: 1
                  }),
                  new TextRun({
                    text: ` (${date.toFormat('yyyy/MM/dd')})`
                  })
                ]
              })
            ])
            .flat(),
          ...createHeading1(resume.other_publications.title),
          ...resume.peer_review_publications.items
            .map(({ date, venue, title }) => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: title,
                    bold: true
                  }),
                  new TextRun({
                    text: venue,
                    bold: true,
                    break: 1
                  }),
                  new TextRun({
                    text: ` (${date.toFormat('yyyy/MM')})`
                  })
                ]
              })
            ])
            .flat()
        ]
      }
    ]
  });
  const documentBlob = await Packer.toBlob(document);
  const filename = `${slugify(resume.page_title)}.docx`;
  const response = new Response(documentBlob, {
    headers: {
      'content-type':
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'content-disposition': `attachment; filename=${filename}`
    }
  });
  return response;
}
