export default async function sendGravityFormData(formId, values) {
  const url = `${process.env.GATSBY_WP_URL}/wp-json/gf/v2/forms/${formId}/submissions`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
}
