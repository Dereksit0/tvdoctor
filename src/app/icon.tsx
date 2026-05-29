import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#B9122C',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '18%',
        }}
      >
        <span
          style={{
            color: 'white',
            fontSize: 84,
            fontWeight: 900,
            letterSpacing: '-4px',
            fontFamily: 'sans-serif',
          }}
        >
          TVD
        </span>
      </div>
    ),
    { ...size }
  );
}
