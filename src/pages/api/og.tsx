import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'experimental-edge',
};

// eslint-disable-next-line react/display-name
export default function () {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        OMUK
      </div>
    ),
    {
      width: 1200,
      height: 600,
    },
  );
}
