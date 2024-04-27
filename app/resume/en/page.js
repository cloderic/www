import loadContent from '../../content/utils/loadContent';
import { H1, H2, H3 } from '../../../components/title';

export const metadata = {
  title: 'Resume',
  alternates: {
    canonical: '/resume/en'
  }
};

export default async function ResumeEn({}) {
  const resumeMdx = await loadContent('app/content/resume-en.mdx');
  return (
    <>
      <H1>Clodéric Mars</H1>
      AI Product Engineer / Tech Leader / Public Speaker
      {resumeMdx.content}
    </>
  );
}
