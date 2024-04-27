import loadContent from '../../content/utils/loadContent';
import { H1 } from '../../../components/title';

export const metadata = {
  title: 'CV',
  alternates: {
    canonical: '/resume/fr'
  }
};

export default async function ResumeFr({}) {
  const resumeMdx = await loadContent('app/content/resume-fr.mdx');
  return (
    <>
      <H1>Clodéric Mars</H1>
      AI Product Engineer / Tech Leader / Public Speaker{resumeMdx.content}
    </>
  );
}
