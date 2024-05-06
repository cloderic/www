import sortBy from 'lodash.sortby';
import { promises as fs } from 'fs';
import difference from 'lodash.difference';
import { parse } from 'yaml';

import listContent from '../../content/utils/listContent';
import Resume from '../resume';

export const metadata = {
  title: 'Resume',
  alternates: {
    canonical: '/resume/en'
  }
};

export default async function ResumeEn({}) {
  const resumeFile = await fs.readFile('app/resume/en/resume.en.yml', 'utf8');
  const resume = parse(resumeFile);
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
    <Resume
      resume={resume}
      publications={publications}
      talks={talks}
      otherPublications={otherPublications}
      moocs={moocs}
    />
  );
}
