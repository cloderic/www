import loadContent from '../content/utils/loadContent';
import { H1 } from '../../components/base';
import HomeLink from '../../components/homeLink';

export const metadata = {
  title: 'Biography',
  alternates: {
    canonical: '/bio'
  }
};

export default async function Bio({}) {
  const bioEnMdx = await loadContent('app/content/bio-en.mdx');
  const bioFrMdx = await loadContent('app/content/bio-fr.mdx');
  return (
    <>
      <H1>Biography 🇬🇧</H1>
      {bioEnMdx.content}
      <H1>Biographie 🇫🇷</H1>
      {bioFrMdx.content}
      <footer className="mt-4 text-center">
        <HomeLink />
      </footer>
    </>
  );
}
