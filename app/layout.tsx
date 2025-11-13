// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Script from 'next/script';

const GA_ID = (process.env.NEXT_PUBLIC_GA_ID ?? 'G-XXXXXXXXXX').trim();

export const metadata: Metadata = {
  title: 'Tu App',
  description: '...',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {/* --- GA4: carga del script --- */}
        {GA_ID && (
          <>
            <Script
              id="ga4-src"
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { anonymize_ip: true });
              `}
            </Script>

            {/* --- GA4: pageviews en cambios de ruta (SPA) sin componentes extra --- */}
            <Script id="ga4-route-listener" strategy="afterInteractive">
              {`
                (function(){
                  var GA_ID='${GA_ID}';
                  if(!GA_ID) return;

                  var lastPath = location.pathname + location.search;

                  function track(){
                    var p = location.pathname + location.search;
                    if(p === lastPath) return;
                    lastPath = p;
                    if (window.gtag) window.gtag('config', GA_ID, { page_path: p });
                  }

                  ['pushState','replaceState'].forEach(function(type){
                    var orig = history[type];
                    history[type] = function(){
                      var rv = orig.apply(this, arguments);
                      window.dispatchEvent(new Event('locationchange'));
                      return rv;
                    }
                  });

                  window.addEventListener('popstate', function(){
                    window.dispatchEvent(new Event('locationchange'));
                  });

                  window.addEventListener('locationchange', track);
                })();
              `}
            </Script>
          </>
        )}

        {children}
      </body>
    </html>
  );
}
