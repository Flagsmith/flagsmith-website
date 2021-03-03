import PropTypes from 'prop-types';
import React from 'react';

import Header from 'components/shared/header';
import Footer from 'components/shared/footer';
import SEO from 'components/shared/seo';

const MainLayout = ({ children }) => (
  <>
    <SEO />
    <Header />
    <main>{children}</main>
    <Footer />
  </>
);

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
