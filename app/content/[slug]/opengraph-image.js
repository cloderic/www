import { generateOgThumbnail, size, contentType } from '../../opengraph-image';
import { loadMatchingContent } from './page';
import truncate from 'lodash.truncate';

// Image metadata
export const alt = 'Thumbnail picture for a content page on cloderic.com';
export const size = size;
export const contentType = contentType;

// Image generation
export default async function Image({ params }) {
  let title = params.slug;
  try {
    const { frontmatter } = await loadMatchingContent({ params });
    title = frontmatter.title;
  } catch (error) {
    console.error(
      'Unexpected error while rendering the open graph image',
      error
    );
  }

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
