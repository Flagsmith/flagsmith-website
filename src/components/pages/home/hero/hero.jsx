import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import Button from 'components/shared/button/button';
import Heading from 'components/shared/heading/heading';

import Features from './features/features';
import styles from './hero.module.scss';
import Logos from './logos/logos';


const cx = classNames.bind(styles);

const Hero = ({ title, description, button, codeLabel, code, logosTitle, logos }) => (
  <section className={cx('wrapper')}>
    <div className={cx('container', 'inner')}>
      <Heading className={cx('title')}>{title}</Heading>
      <p className={cx('description')}>{description}</p>
      <Button
        className={cx('button')}
        theme="accent-primary"
        to={button.url}
        target={button.target}
      >
        {button.title}
      </Button>
      <Features codeLabel={codeLabel} code={code} />
      <Logos title={logosTitle} items={logos} />
    </div>
  </section>
);

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  button: PropTypes.shape({
    url: PropTypes.string,
    target: PropTypes.string,
    title: PropTypes.string,
  }),
};

export default Hero;
