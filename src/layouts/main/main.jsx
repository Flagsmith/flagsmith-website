import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import Header from 'components/shared/header';
import Footer from 'components/shared/footer';
import SEO from 'components/shared/seo';
import MobileMenu from 'components/shared/mobile-menu';

const MainLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleHeaderBurgerClick = () => setIsMobileMenuOpen(true);
  const handleMobileNavCloseButtonClick = () => setIsMobileMenuOpen(false);
  useEffect(() => {
    if (isMobileMenuOpen) {
      // documentElement = html
      document.documentElement.style.cssText = 'overflow: hidden';
      // Position fixed here is to prevent scrolling on iOS
      document.body.style.cssText = 'position: fixed; width: 100%';
    } else {
      // documentElement = html
      document.documentElement.style.cssText = '';
      document.body.style.cssText = '';
    }
  }, [isMobileMenuOpen]);
  return (
    <>
      <SEO />
      <Header onBurgerClick={handleHeaderBurgerClick}/>
      <main>{children}</main>
      <Footer />
      <MobileMenu isOpen={isMobileMenuOpen} onCloseButtonClick={handleMobileNavCloseButtonClick}/>
    </>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
