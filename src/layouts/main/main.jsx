import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';

import Header from 'components/shared/header';
import Footer from 'components/shared/footer';
import SEO from 'components/shared/seo';
import MobileMenu from 'components/shared/mobile-menu';

const MainLayout = ({
  seo,
  menus: { headerMenuItems, footerMenuItems, mobileMenuItems },
  children,
}) => {
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
      {seo && <SEO {...seo} />}
      <Header menuItems={headerMenuItems} onBurgerClick={handleHeaderBurgerClick} />
      <main>{children}</main>
      <Footer menuItems={footerMenuItems} />
      <MobileMenu menuItems={mobileMenuItems} isOpen={isMobileMenuOpen} onCloseButtonClick={handleMobileNavCloseButtonClick} />
    </>
  );
};

export const query = graphql`
  fragment wpPageSeo on WpPage {
    seo {
      canonical
      cornerstone
      focuskw
      metaDesc
      metaKeywords
      metaRobotsNofollow
      metaRobotsNoindex
      opengraphAuthor
      opengraphDescription
      opengraphImage {
        localFile {
          childImageSharp {
            fixed(toFormat: JPG, width: 1200, height: 630) {
              src
            }
          }
        }
      }
      opengraphModifiedTime
      opengraphPublishedTime
      opengraphPublisher
      opengraphSiteName
      opengraphTitle
      opengraphType
      opengraphUrl
      title
      twitterDescription
      twitterTitle
    }
  }
`;

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
