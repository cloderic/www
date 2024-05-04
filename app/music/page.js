import Image from 'next/image';
import { H1 } from '../../components/title';
import { Mdx } from '../../components/markdown';
import HomeLink from '../../components/homeLink';
import ContentList from '../../components/contentList';
import listContent from '../content/utils/listContent';

import banner from './two-clouds-away.jpeg';

export const metadata = {
  title: 'Music',
  description: 'Music recordings archive',
  alternates: {
    canonical: '/content/music'
  }
};

export default async function Music() {
  const musicContent = (
    await listContent({ parseFrontmatter: true })
  ).filter(({ categories = [] }) => categories.find((c) => c === 'music'));
  return (
    <div className="max-w-prose">
      <div className="relative aspect-video -mt-4 -mx-4 md:-mt-8 md:-mx-8">
        <Image
          fill={true}
          src={banner}
          className="object-cover"
          alt={
            "Two Clouds Away (Clodéric's band at University) playing live on stage"
          }
        />
      </div>
      <H1 noanchor>Music</H1>
      <Mdx>
        I've been _on and off_ playing music since, well, forever. This page is
        my public archive of the tunes I've recorded...
      </Mdx>
      <ContentList
        items={musicContent}
        renderDate={({ date }) => date.toFormat('yyyy')}
        renderTitle={({ title }) => title}
        renderSubtitle={() => <span className="italic">Solo</span>}
      />
      <footer className="mt-4 text-center">
        <HomeLink />
      </footer>
    </div>
  );
}
