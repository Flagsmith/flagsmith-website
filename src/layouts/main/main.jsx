import PropTypes from 'prop-types';
import React from 'react';

import Header from 'components/shared/header';
import Footer from 'components/shared/footer';

const MainLayout = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
);

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
