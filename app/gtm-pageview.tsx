'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function GTMPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams}` : '');
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: 'pageview', // Custom Event name listened by GTM
      page: url,         // Useful for GA4 page_location param
    });
  }, [pathname, searchParams]);

  return null;
}
