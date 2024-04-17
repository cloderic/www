import { ImageResponse } from 'next/og';
import { promises as fs } from 'fs';

import twConfig from '../tailwind.config';

// Image metadata
export const alt = 'cloderic.com - homepage';
export const size = {
  width: 1200,
  height: 600
};

export const contentType = 'image/png';

export async function generateOgThumbnail(children, size) {
  const marsImg = await fs.readFile('public/mars.png');

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `linear-gradient(to bottom right, ${twConfig.theme.colors.pink.DEFAULT}, ${twConfig.theme.colors.slate['300']})`,
          fontFamily: 'ui-sans-serif, system-ui',
          fontSize: 32,
          fontWeight: 300
        }}
      >
        <div
          style={{
            left: 42,
            top: 42,
            position: 'absolute',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <img src={marsImg.buffer} width={50} height={50} />
          <div>cloderic.com</div>
        </div>
        {children}
      </div>
    ),
    // ImageResponse options
    {
      ...size
    }
  );
}

// Image generation
export default async function Image() {
  return generateOgThumbnail(<div style={{ fontSize: 200 }}>/</div>, size);
}
