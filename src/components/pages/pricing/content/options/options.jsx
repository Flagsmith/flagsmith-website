import classNames from 'classnames/bind';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import React from 'react';

import Button from 'components/shared/button';
import Heading from 'components/shared/heading';

import IconCheck from './images/check.inline.svg';
import styles from './options.module.scss';

const cx = classNames.bind(styles);

const Options = ({ items }) => {
  const { illustrationPrivateCloud, illustrationOnPremise } = useStaticQuery(graphql`
    query {
      illustrationPrivateCloud: file(
        relativePath: { eq: "pages/pricing/hero/options/illustration-private-cloud.jpg" }
      ) {
        childImageSharp {
          gatsbyImageData(width: 330)
        }
      }

      illustrationOnPremise: file(
        relativePath: { eq: "pages/pricing/hero/options/illustration-on-premise.jpg" }
      ) {
        childImageSharp {
          gatsbyImageData(width: 340)
        }
      }
    }
  `);

  const imageCollection = {
    privateCloud: illustrationPrivateCloud,
    onPremise: illustrationOnPremise,
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('items-wrapper')}>
        {items.map(({ title, features, imageName }, index) => {
          const image = imageCollection[imageName];
          return (
            <div className={cx('item')} key={index}>
              <Heading className={cx('title')} tag="h3" size="lg" color="quaternary">
                {title}
              </Heading>

              <div className={cx('image-wrapper')}>
                <GatsbyImage className={cx('image')} image={getImage(image)} alt="" />
              </div>
              <Button className={cx('button')} theme="accent-primary" to="#contact-us">
                Contact us
              </Button>
              <div className={cx('content')}>
                <ul className={cx('features')}>
                  {features.map(({ text }, index) => (
                    <li key={index}>
                      <IconCheck />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Options.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      imageName: PropTypes.string.isRequired,
      features: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default Options;
