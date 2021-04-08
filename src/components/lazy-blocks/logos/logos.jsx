import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './logos.module.scss';

const cx = classNames.bind(styles);

const Logos = ({ text, items, withBackground, marginBottom }) => (
  <div
    className={cx('wrapper', {
      'with-background': withBackground,
      primary: withBackground,
      [`margin-bottom-${marginBottom}`]: marginBottom,
    })}
  >
    <div className={cx('container')}>
      {text && <p className={cx('text')}>{text}</p>}
      <div className={cx('items-wrapper')}>
        {items.map((item, index) => (
          <img className={cx('item')} src={item.url} alt={item.alt} key={index} />
        ))}
      </div>
    </div>
  </div>
);

Logos.propTypes = {
  text: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ).isRequired,
  withBackground: PropTypes.bool,
  marginBottom: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
};

Logos.defaultProps = {
  text: '',
  withBackground: false,
  marginBottom: null,
};

export default Logos;
