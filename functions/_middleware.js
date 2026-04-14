export async function onRequest(context) {
  const { request, env, next } = context;

  // Get the response from the origin
  const response = await next();

  // If the response is not HTML, return it as-is
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("text/html")) {
    return response;
  }

  // Get the GA Tracking ID from the environment
  const gaTrackingId = env.GA_TRACKING_ID;

  // If no tracking ID is configured, return the response as-is
  if (!gaTrackingId) {
    return response;
  }

  // Define the Google Analytics script to inject
  const gaScript = `
    <!-- Google tag (gtag.js) injected by middleware -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaTrackingId}');
    </script>
  `;

  // Use HTMLRewriter to inject the script into the <head>
  return new HTMLRewriter()
    .on("head", {
      element(element) {
        element.append(gaScript, { html: true });
      },
    })
    .transform(response);
}
