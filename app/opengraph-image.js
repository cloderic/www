import { createImageResponse } from './ogThumbnail';

// Image metadata
export { size, contentType } from './ogThumbnail';
export const alt = 'cloderic.com - homepage';

// Image generation
export default async function Image() {
  return createImageResponse(<div style={{ fontSize: 200 }}>/</div>);
}
