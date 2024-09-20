import { parse } from 'yaml';
import { promises as fs } from 'fs';
import difference from 'lodash.difference';
import sortBy from 'lodash.sortby';
import listContent from '../content/utils/listContent';

export default async function loadResume(locale) {
  const resumeFile = await fs.readFile(
    `app/resume/resume.${locale}.yml`,
    'utf8'
  );
  const resume = parse(resumeFile);
  if (process.env.CONTACT_MAIL) {
    resume.contact.mail = process.env.CONTACT_MAIL;
  }
  if (process.env.CONTACT_PHONE) {
    resume.contact.phone = process.env.CONTACT_PHONE;
  }
  if (process.env.CONTACT_ADDRESS) {
    resume.contact.address = process.env.CONTACT_ADDRESS;
  }
  const contentItems = sortBy(
    await listContent({ parseFrontmatter: true }),
    'date'
  ).reverse();
  resume.education.moocs.items = contentItems.filter(({ categories = [] }) =>
    categories.find((category) => category == 'mooc')
  );
  const resumeContentItems = contentItems.filter(({ categories = [] }) =>
    categories.find((category) => category == 'resume')
  );
  resume.peer_review_publications.items = resumeContentItems.filter(
    ({ categories = [] }) =>
      categories.find((category) => category == 'publication')
  );
  resume.talks.items = difference(
    resumeContentItems.filter(({ categories = [] }) =>
      categories.find((category) => category == 'talk')
    ),
    resume.peer_review_publications.items
  );
  resume.other_publications.items = difference(
    resumeContentItems,
    resume.peer_review_publications.items,
    resume.talks.items
  );

  return resume;
}
