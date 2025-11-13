// app/gtm-pageview.tsx
"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// Minimal global typing for dataLayer (optional but handy)
declare global {
  interface Window {
    dataLayer: any[];
  }
}

export default function GTMPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams}` : "");
    // Ensure dataLayer exists
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      // Custom event name 'pageview' — match this in your GTM trigger
      window.dataLayer.push({
        event: "pageview",
        page: url, // helpful for page_location param inside GTM
      });
    }
  }, [pathname, searchParams]);

  return null;
}
