import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useTracking = (
  gtag: (key: string, trackingId: string, config: { page_path: string }) => void,
  trackingId: string,
) => {
  const location = useLocation();

  useEffect(() => {
    // Trigger GA4 page view on route change
    gtag('config', trackingId, { page_path: location.pathname });
  }, [trackingId, location, gtag]);
};
