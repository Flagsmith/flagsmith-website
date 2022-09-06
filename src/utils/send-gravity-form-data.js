export default async function sendGravityFormData(formId, values) {
  // Track event in Google Analytics
  window.gtag('event', 'Contact Us Form Submission', {
    event_category: 'Website',
  });

  // Put the form data into Pipedrive
  const url_vercel = `/api/contact-us`;
  try {
    const response = await fetch(url_vercel, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
  } catch (error) {}

  // Regular gatsby form processor which emails and slacks us
  const url_wordpress = `${process.env.GATSBY_WP_URL}/wp-json/gf/v2/forms/${formId}/submissions`;
  try {
    const response = await fetch(url_wordpress, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
}
