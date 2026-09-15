import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "T. Tamil Arsen — Software Engineer";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

async function loadFonts() {
  const regular = await fetch(
    new URL("./opengraph-image-font/IBMPlexMono-Regular.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  return { regular };
}

export default async function OpengraphImage() {
  const { regular } = await loadFonts();

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
      <circle cx="16" cy="16" r="1.5" fill="#2E2E31" />
    </svg>
  `;

  const dotPattern = `data:image/svg+xml,${encodeURIComponent(svg)}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        backgroundColor: "#141414",
        backgroundImage: `url("${dotPattern}")`,
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: 12,
          backgroundColor: "#B33A47",
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 15% 30%, rgba(179,58,71,0.14), transparent 60%)",
        }}
      />

      {/* Main content */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
          padding: "90px 70px 90px 80px",
          maxWidth: 900,
        }}
      >
        {/* Terminal prompt */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 18,
          }}
        >
          <span
            style={{
              color: "#B33A47",
              fontSize: 20,
              fontWeight: 700,
              fontFamily: "IBM Plex Mono",
              marginRight: 8,
            }}
          >
            &gt;
          </span>

          <span
            style={{
              color: "#84848C",
              fontSize: 20,
              fontWeight: 400,
              fontFamily: "IBM Plex Mono",
              letterSpacing: 1.2,
            }}
          >
            tamilarsen-dev
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            display: "flex",
            fontWeight: 700,
            fontFamily: "IBM Plex Mono",
            fontSize: 72,
            letterSpacing: -1.5,
            lineHeight: 1,
            gap: 16,
          }}
        >
          <span style={{ color: "#F4F4F5" }}>T. Tamil</span>
          <span style={{ color: "#B33A47" }}>Arsen</span>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            color: "#A1A1AA",
            fontSize: 20,
            fontWeight: 700,
            fontFamily: "IBM Plex Mono",
            letterSpacing: 5,
            marginTop: 18,
          }}
        >
          SOFTWARE ENGINEER
        </div>

        {/* Accent underline */}
        <div
          style={{
            width: 90,
            height: 3,
            marginTop: 16,
            marginBottom: 28,
            background:
              "linear-gradient(90deg, rgba(179,58,71,0.95) 0%, rgba(179,58,71,0.2) 100%)",
          }}
        />

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 24,
            fontWeight: 400,
            fontFamily: "IBM Plex Mono",
            color: "#F4F4F5",
            lineHeight: 1.45,
          }}
        >
          <div style={{ display: "flex" }}>
            <span>Building&nbsp;</span>

            <span
              style={{
                color: "#CE6A75",
                fontWeight: 700,
                fontFamily: "IBM Plex Mono",
              }}
            >
              reliable&nbsp;
            </span>

            <span>web applications</span>
          </div>

          <div style={{ display: "flex" }}>
            <span>and backend services with&nbsp;</span>

            <span
              style={{
                color: "#CE6A75",
                fontWeight: 700,
                fontFamily: "IBM Plex Mono",
              }}
            >
              clean
            </span>

            <span>, maintainable code.</span>
          </div>
        </div>

        {/* Tech stack */}
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 20,
            fontWeight: 700,
            fontFamily: "IBM Plex Mono",
            color: "#F4F4F5",
            letterSpacing: 0.3,
          }}
        >
          <span>Node.js</span>

          <span
            style={{
              color: "#B33A47",
              margin: "0 10px",
            }}
          >
            ·
          </span>

          <span>TypeScript</span>

          <span
            style={{
              color: "#B33A47",
              margin: "0 10px",
            }}
          >
            ·
          </span>

          <span>Next.js</span>

          <span
            style={{
              color: "#B33A47",
              margin: "0 10px",
            }}
          >
            ·
          </span>

          <span>PostgreSQL</span>
        </div>
      </div>

      {/* Bottom status strip */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 56,
          display: "flex",
          alignItems: "center",
          paddingLeft: 80,
          borderTop: "2px solid #2E2E31",
          backgroundColor: "#242424",
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 999,
            backgroundColor: "#22C55E",
            marginRight: 12,
          }}
        />

        <span
          style={{
            color: "#A1A1AA",
            fontSize: 18,
            fontWeight: 400,
            fontFamily: "IBM Plex Mono",
            letterSpacing: 1,
          }}
        >
          https://tamil-arsen.dev/
        </span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "IBM Plex Mono",
          data: regular,
          weight: 400,
          style: "normal",
        },
      ],
    },
  );
}
