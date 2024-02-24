export const GA_MEASUREMENT_ID = 'G-29F0DTD8JH';

export const initializeGA = () => {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);

  return gtag;
};
