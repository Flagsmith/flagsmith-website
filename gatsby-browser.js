/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
require('./src/styles/app.scss');

if (window.navigator && navigator.serviceWorker) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const registration of registrations) {
      registration.unregister();
    }
  });
}
