import { H1 } from '../../components/title';
import { Mdx } from '../../components/markdown';
import HomeLink from '../../components/homeLink';
import HeroImage from '../../components/heroImage';
import Audio from '../../components/players/audio';
import listContent from '../content/utils/listContent';

import banner from './two-clouds-away.jpeg';

export const metadata = {
  title: 'Music',
  description: 'Music recordings archive',
  alternates: {
    canonical: '/music'
  }
};

export default async function Music() {
  const tracks = (await listContent({ parseFrontmatter: true }))
    .filter(({ categories = [] }) => categories.find((c) => c === 'music'))
    .map(({ slug, audioTracks }) =>
      audioTracks.map((track) => ({
        ...track,
        learnMoreHref: `/content/${slug}`
      }))
    )
    .flat();
  return (
    <div className="max-w-prose">
      <HeroImage
        src={banner}
        alt="Two Clouds Away (Clodéric's band at University) playing live on stage"
      />
      <H1 noanchor>Music</H1>
      <Mdx>
        I've been _on and off_ playing music since, well, forever. This page is
        my public archive of the tunes I've recorded...
      </Mdx>
      <Audio tracks={tracks} className="mt-4" />
      <footer className="mt-4 text-center">
        <HomeLink />
      </footer>
    </div>
  );
}
