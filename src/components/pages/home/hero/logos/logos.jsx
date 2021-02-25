import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './logos.module.scss';

import starbucks from './images/starbucks.url.svg';
import amway from './images/amway.url.svg';
import nike from './images/nike.url.svg';
import cognizant from './images/cognizant.url.svg';
import ft from './images/ft.url.svg';
import capita from './images/capita.url.svg';
import axis from './images/axis.url.svg';
import aerLingus from './images/aer-lingus.url.svg';

const cx = classNames.bind(styles);

const Logos = ({ title, items }) => (
  <>
    <p className={cx('title')}>{title}</p>
    <div className={cx('items-wrapper')}>
      {items.map(({ path, altText }, index) => (
        <img className={cx('item')} src={path} alt={altText} loading="lazy" key={index} />
      ))}
    </div>
  </>
);

Logos.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      altText: PropTypes.string.isRequired,
    })
  ).isRequired,
};

Logos.defaultProps = {
  title: 'Use our hosted API, deploy to your own private cloud, or run on-premise',
  items: [
    {
      path: starbucks,
      altText: 'Starbucks',
    },
    {
      path: amway,
      altText: 'Amway',
    },
    {
      path: nike,
      altText: 'Nike',
    },
    {
      path: cognizant,
      altText: 'Cognizant',
    },
    {
      path: ft,
      altText: 'FT',
    },
    {
      path: capita,
      altText: 'Capita',
    },
    {
      path: axis,
      altText: 'Axis',
    },
    {
      path: aerLingus,
      altText: 'Aer Lingus',
    },
  ],
};

export default Logos;
