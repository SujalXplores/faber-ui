"use client";

import * as React from "react";

export default function GlobalErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main
          style={{
            margin: "0 auto",
            maxWidth: "42rem",
            padding: "8rem 1.5rem",
            textAlign: "center",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <h1 style={{ fontSize: "1.5rem", fontWeight: 600 }}>
            Something went wrong.
          </h1>
          <p style={{ marginTop: "0.75rem", opacity: 0.7 }}>
            The application failed to load. Try again.
          </p>
          <button
            type="button"
            onClick={() => retry()}
            style={{
              marginTop: "2rem",
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              border: "1px solid currentColor",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
