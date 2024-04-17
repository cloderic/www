import { loadMatchingContent } from './page';
import truncate from 'lodash.truncate';
import { createImageResponse } from '../../ogThumbnail';

// Image metadata
export { size, contentType } from '../../ogThumbnail';
export const alt = 'Thumbnail picture for a content page on cloderic.com';

// Image generation
export default async function Image({ params }) {
  let title;
  try {
    const { frontmatter } = await loadMatchingContent({ params });
    title = truncate(frontmatter.title, { length: 45, separator: /[,:.] +/ });
  } catch (error) {
    console.error(
      'Unexpected error while rendering the open graph image',
      error
    );
    title = str(error);
  }

  return createImageResponse(
    <div
      style={{
        fontSize: 55,
        textAlign: 'center'
      }}
    >
      {title}
    </div>
  );
}
