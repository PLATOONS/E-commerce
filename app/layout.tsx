// app/layout.tsx
import type { Metadata } from "next";
import Script from "next/script";

// (deja estas importaciones si ya existen en tu proyecto)
import "../Frontend/styles.css";
import "../styles/global.css";

import GTMPageView from "./gtm-pageview";

export const metadata: Metadata = {
  title: "E-commerce",
  description: "Store",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
  // Enable GTM in production, or in dev if the flag is set
  const enableGTM =
    process.env.NODE_ENV === "production" ||
    process.env.NEXT_PUBLIC_ENABLE_GTM === "true";

  return (
    <html lang="en">
      <head>
        {/* GTM container (loads the GTM script and creates dataLayer) */}
        {enableGTM && GTM_ID ? (
          <Script id="gtm-head" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `}
          </Script>
        ) : null}
      </head>

      <body className="antialiased">
        {/* GTM noscript fallback (required by GTM) */}
        {enableGTM && GTM_ID ? (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
                <iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
                  height="0" width="0" style="display:none;visibility:hidden"></iframe>
              `,
            }}
          />
        ) : null}

        {children}

        {/* Push SPA page_view on every route change */}
        {enableGTM && GTM_ID ? <GTMPageView /> : null}
      </body>
    </html>
  );
}
