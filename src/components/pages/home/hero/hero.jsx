import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Heading from 'components/shared/heading/heading';
import Button from 'components/shared/button/button';
import Features from './features/features';
import Logos from './logos/logos';

import styles from './hero.module.scss';

const cx = classNames.bind(styles);

const Hero = ({ title, description, buttonText, buttonLink }) => (
  <section className={cx('wrapper')}>
    <div className={cx('container', 'inner')}>
      <Heading className={cx('title')}>{title}</Heading>
      <p className={cx('description')}>{description}</p>
      <Button className={cx('button')} theme="accent-primary" to={buttonLink}>
        {buttonText}
      </Button>
      <Features />
      <Logos />
    </div>
  </section>
);

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

Hero.defaultProps = {
  title: 'Feature flag, Remote Config Service',
  description: 'Use our hosted API, deploy to your own private cloud, or run on-premise',
  buttonText: 'Start Free Trial',
  buttonLink: '/',
};

export default Hero;
