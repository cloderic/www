import { generateOgThumbnail } from '../../opengraph-image';
import { loadMatchingContent } from './page';
import truncate from 'lodash.truncate';

// Image metadata
export const alt = 'cloderic.com - content thumbnail';
export const size = {
  width: 1200,
  height: 600
};

export const contentType = 'image/png';

// Image generation
export default async function Image({ params }) {
  const { frontmatter } = await loadMatchingContent({ params });
  return generateOgThumbnail(
    <div
      style={{
        fontSize: 55,
        textAlign: 'center'
      }}
    >
      {truncate(frontmatter.title, { length: 45, separator: /[,:.] +/ })}
    </div>,
    size
  );
}
