import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './avatar.module.scss';
import defaultPhoto from './images/photo.jpg';

const cx = classNames.bind(styles);

const Avatar = ({ fullName, position, photo, theme, isReversed, additionalClassName }) => (
  <div className={cx('wrapper', { reversed: isReversed }, additionalClassName)}>
    <div className={cx('image-wrapper')}>
      <img src={photo} alt="" />
    </div>
    {fullName && position && (
      <div className={cx('badge', theme)}>
        <span>{fullName}</span>
        <span>{position}</span>
      </div>
    )}
  </div>
);

Avatar.propTypes = {
  fullName: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(['light', 'dark']),
  isReversed: PropTypes.bool,
  additionalClassName: PropTypes.string,
};

Avatar.defaultProps = {
  photo: defaultPhoto,
  theme: 'light',
  isReversed: false,
  additionalClassName: null,
};

export default Avatar;
