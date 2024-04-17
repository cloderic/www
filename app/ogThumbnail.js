import { ImageResponse } from 'next/og';

import { promises as fs } from 'fs';

import twConfig from '../tailwind.config';

export const size = {
  width: 1200,
  height: 630
};
export const contentType = 'image/png';

export async function createImageResponse(children) {
  const marsImg = await fs.readFile('app/icon.png');

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `linear-gradient(to bottom right, ${twConfig.theme.colors.pink.DEFAULT}, ${twConfig.theme.colors.slate['300']})`,
          fontFamily: 'ui-sans-serif, system-ui',
          fontWeight: 300
        }}
      >
        <div
          style={{
            left: 20,
            top: 20,
            position: 'absolute',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '10px',
            fontSize: 32
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
