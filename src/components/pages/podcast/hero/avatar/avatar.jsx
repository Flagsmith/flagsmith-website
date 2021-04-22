import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './avatar.module.scss';

const cx = classNames.bind(styles);

const Avatar = ({ fullName, position, isThemeLight, reversed }) => (
  <div className={cx('wrapper', { reversed })}>
    <div className={cx('image-wrapper')} />
    <div className={cx('badge', { light: isThemeLight })}>
      <p>{fullName}</p>
      <p>{position}</p>
    </div>
  </div>
);

Avatar.propTypes = {};

Avatar.defaultProps = {};

export default Avatar;
