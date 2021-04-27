import classNames from 'classnames/bind';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import React from 'react';

import Avatar from '../avatar';

import styles from './hero.module.scss';
import leftBackground from './images/left-background.svg';
import rightBackground from './images/right-background.svg';

const cx = classNames.bind(styles);

const Hero = (props) => {
  const { host, guest, logo, quote } = props;
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
            <img src={leftBackground} alt="" />
          </div>
          <div className={cx('background', 'right')}>
            <img src={rightBackground} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

Hero.propTypes = {};

Hero.defaultProps = {};

export default Hero;
