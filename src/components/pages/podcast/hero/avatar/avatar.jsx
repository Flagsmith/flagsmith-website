import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './avatar.module.scss';

const cx = classNames.bind(styles);

const Avatar = ({ fullName, position, photo, theme, isReversed }) => (
  <div className={cx('wrapper', { reversed: isReversed })}>
    <div className={cx('image-wrapper')}>
      <img src={photo} alt="" />
    </div>
    <div className={cx('badge', theme)}>
      <p>{fullName}</p>
      <p>{position}</p>
    </div>
  </div>
);

Avatar.propTypes = {
  fullName: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(['light', 'dark']),
  isReversed: PropTypes.bool,
};

Avatar.defaultProps = {
  theme: 'light',
  isReversed: false,
};

export default Avatar;
