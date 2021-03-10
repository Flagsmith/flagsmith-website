import React from 'react';

import MainLayout from 'layouts/main';

const NotFoundPage = () => (
  // <MainLayout>
  <div
    style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadaaaaaness.</p>
  </div>
  // </MainLayout>
);

export default NotFoundPage;
