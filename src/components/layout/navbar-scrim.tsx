export function NavbarScrim() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-40"
    >
      {/* ================================================== */}
      {/* Deep blur */}
      {/* ================================================== */}

      <div
        className="absolute inset-x-0 top-0 h-17.5"
        style={{
          backdropFilter: "blur(16px) saturate(1.3)",
          WebkitBackdropFilter: "blur(16px) saturate(1.3)",

          maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",

          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, transparent 100%)",
        }}
      />

      {/* ================================================== */}
      {/* Medium blur */}
      {/* ================================================== */}

      <div
        className="absolute inset-x-0 top-0 h-30"
        style={{
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",

          maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",

          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, transparent 100%)",
        }}
      />

      {/* ================================================== */}
      {/* Atmospheric blur */}
      {/* ================================================== */}

      <div
        className="absolute inset-x-0 top-0 h-45"
        style={{
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",

          maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",

          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
