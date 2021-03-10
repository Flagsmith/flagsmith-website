/* eslint-disable react/prop-types */
import { useStaticQuery, graphql } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

import createMetaImagePath from 'utils/create-meta-image-path';

const SEO = (props) => {
  const {
    title,
    metaDesc,
    metaKeywords,
    metaRobotsNoindex,
    opengraphDescription,
    opengraphTitle,
    opengraphImage,
    opengraphUrl,
    canonical,
  } = props;

  const {
    wp: { generalSettings: settings },
    site: {
      siteMetadata: { siteUrl, siteImage },
    },
  } = useStaticQuery(graphql`
    query {
      wp {
        generalSettings {
          language
        }
      }
      site {
        siteMetadata {
          siteUrl
          siteImage
        }
      }
    }
  `);

  const opengraphPreviewImage = opengraphImage
    ? createMetaImagePath(opengraphImage, siteUrl)
    : siteUrl + siteImage;

  const isRobotsNoindexPage = metaRobotsNoindex === 'noindex';
  return (
    <Helmet
      title={title}
      htmlAttributes={{
        lang: settings.language,
        prefix: 'og: http://ogp.me/ns#',
      }}
    >
      {/* General */}
      <meta name="description" content={metaDesc} />
      {metaKeywords && <meta name="keywords" content={metaKeywords} />}
      {isRobotsNoindexPage && <meta name="robots" content="noindex" />}
      {/* Open Graph */}
      {opengraphUrl.startsWith(siteUrl) && <meta property="og:url" content={opengraphUrl} />}
      <meta property="og:title" content={opengraphTitle} />
      <meta property="og:description" content={opengraphDescription} />
      <meta property="og:image" content={opengraphPreviewImage} />
      <meta property="og:type" content="website" />
      {canonical.startsWith(siteUrl) && <link rel="canonical" href={canonical} />}
    </Helmet>
  );
};

export default SEO;
