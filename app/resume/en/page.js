import loadContent from '../../content/utils/loadContent';
import { H1 } from '../../../components/base';

export const metadata = {
  title: 'Resume'
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
