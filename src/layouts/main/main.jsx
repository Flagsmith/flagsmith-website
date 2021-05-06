/* eslint-disable react/prop-types */
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import Footer from 'components/shared/footer';
import Header from 'components/shared/header';
import MobileMenu from 'components/shared/mobile-menu';
import SEO from 'components/shared/seo';
import MainContext from 'context/main';

const MainLayout = ({ seo, children, pageContext }) => {
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
    <MainContext.Provider value={pageContext}>
      {seo && <SEO {...seo} />}
      <Header onBurgerClick={handleHeaderBurgerClick} />
      <main>{children}</main>
      <Footer />
      <MobileMenu isOpen={isMobileMenuOpen} onCloseButtonClick={handleMobileNavCloseButtonClick} />
    </MainContext.Provider>
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
            fixed(toFormat: JPG, width: 1200, height: 630, fit: CONTAIN) {
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
  fragment wpPostSeo on WpPost {
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
            fixed(toFormat: JPG, width: 1200, height: 630, fit: CONTAIN) {
              src
            }
          }
          publicURL
        }
      }
      opengraphModifiedTime
      opengraphPublishedTime
      opengraphPublisher
      opengraphSiteName
      opengraphTitle
      opengraphType
      opengraphUrl
      readingTime
      title
      twitterDescription
      twitterTitle
    }
  }
  fragment wpPodcastSeo on WpPodcast {
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
            fixed(toFormat: JPG, width: 1200, height: 630, fit: CONTAIN) {
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
      readingTime
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
