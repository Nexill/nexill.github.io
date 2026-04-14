/**
 * Shared Google Analytics fallback.
 * Used for environments (like GitHub Pages) where Cloudflare Pages
 * middleware does not dynamically inject the GA tracking script.
 */
(function() {
  const GA_TRACKING_ID = 'G-BRFE09R2JH';

  // Check if the script tag already exists in the DOM (injected by middleware or hardcoded)
  const existingScripts = document.querySelectorAll('script[src*="googletagmanager.com/gtag/js"]');
  if (existingScripts.length > 0) {
    return;
  }

  // Inject the script dynamically
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(){ window.dataLayer.push(arguments); };

  window.gtag('js', new Date());
  window.gtag('config', GA_TRACKING_ID);
})();
