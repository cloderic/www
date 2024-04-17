import { loadMatchingContent } from './page';
import truncate from 'lodash.truncate';
import { createImageResponse } from '../../ogThumbnail';
import { promises as fs } from 'fs';

// Image metadata
export { size, contentType } from '../../ogThumbnail';
export const alt = 'Thumbnail picture for a content page on cloderic.com';

// Image generation
export default async function Image({ params }) {
  const { frontmatter } = await loadMatchingContent({ params });

  let coverImg = null;
  if (frontmatter.cover) {
    coverImg = await fs.readFile('public' + frontmatter.cover);
    return createImageResponse(
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '10px'
        }}
      >
        <img src={coverImg.buffer} height={400} />
        <div
          style={{
            fontSize: 30,
            textAlign: 'center'
          }}
        >
          {truncate(frontmatter.title, {
            length: 70,
            separator: /[,:.]? +/
          })}
        </div>
      </div>
    );
  }

  return createImageResponse(
    <div
      style={{
        fontSize: 55,
        textAlign: 'center'
      }}
    >
      {truncate(frontmatter.title, {
        length: 45,
        separator: /[,:.]? +/
      })}
    </div>
  );
}
