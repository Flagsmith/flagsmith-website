import classNames from 'classnames/bind';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import React from 'react';

import Avatar from '../avatar';

import styles from './hero.module.scss';

const cx = classNames.bind(styles);

const Hero = (props) => {
  const { host, guest, logo, quote } = props;
  const { leftBackground, rightBackground } = useStaticQuery(graphql`
    query {
      leftBackground: file(relativePath: { eq: "pages/podcast/hero/left-background.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 767)
        }
      }
      rightBackground: file(relativePath: { eq: "pages/podcast/hero/right-background.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 767)
        }
      }
    }
  `);

  return (
    <section className={cx('wrapper')}>
      <div className={cx('aspect-ratio')}>
        <div className={cx('inner')}>
          <div>
            {logo && (
              <GatsbyImage
                className={cx('logo')}
                alt={logo.altText}
                image={getImage(logo.localFile)}
              />
            )}
            {quote && <p className={cx('quote')}>{quote}</p>}
          </div>
          <Avatar additionalClassName={cx('avatar', 'host')} {...host} position="Host Interview" />
          <Avatar additionalClassName={cx('avatar', 'guest')} theme="dark" isReversed {...guest} />
          <div className={cx('background', 'left')}>
            <GatsbyImage image={getImage(leftBackground)} alt="" />
          </div>
          <div className={cx('background', 'right')}>
            <GatsbyImage fadeIn="false" image={getImage(rightBackground)} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

Hero.propTypes = {};

Hero.defaultProps = {};

export default Hero;
