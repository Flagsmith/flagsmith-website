import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import Button from 'components/shared/button';
import Heading from 'components/shared/heading';

import IconCheck from './images/check.inline.svg';
import styles from './options.module.scss';


const cx = classNames.bind(styles);

const Options = ({ items }) => (
  <div className={cx('wrapper')}>
    {items.map(({ title, theme, features }, index) => (
      <div className={cx('item', theme)} key={index}>
        <Heading className={cx('title')} tag="h3" size="lg" color={theme}>
          {title}
        </Heading>

        <div className={cx('image')} />
        <Button className={cx('button')} theme={theme} to="#contactForm">
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
    ))}
  </div>
);

Options.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      theme: PropTypes.string.isRequired,
      features: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default Options;
