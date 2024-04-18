import { loadMatchingContent } from './page';
import truncate from 'lodash.truncate';
import { createImageResponse } from '../../ogThumbnail';
import getBaseUrl from '../../getBaseUrl';

// Image metadata
export { size, contentType } from '../../ogThumbnail';
export const alt = 'Thumbnail picture for a content page on cloderic.com';

// Image generation
export default async function Image({ params }) {
  const { frontmatter } = await loadMatchingContent({ params });

  if (frontmatter.cover) {
    const coverImgRes = await fetch(getBaseUrl() + frontmatter.cover);
    const coverImgBuf = await coverImgRes.arrayBuffer();

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
        <img src={coverImgBuf} height={400} />
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
