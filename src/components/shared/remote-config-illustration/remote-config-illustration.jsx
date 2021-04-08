import classNames from 'classnames/bind';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React from 'react';

import { MOTION_EASY } from 'constants/constants';

import item1 from './images/item-1.url.svg';
import item2 from './images/item-2.url.svg';
import item3 from './images/item-3.url.svg';
import popup from './images/popup.url.svg';
import window from './images/window.url.svg';
import styles from './remote-config-illustration.module.scss';

const cx = classNames.bind(styles);

const variantsContentFade = {
  hidden: {
    opacity: 0,
  },
  visible: (custom) => ({
    opacity: 1,
    transition: { delay: custom, duration: 0.5, ease: MOTION_EASY },
  }),
};

const variantsAction = {
  hidden: {
    opacity: 0,
    y: 70,
  },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom, duration: 0.5, ease: MOTION_EASY },
  }),
};

const RemoteConfigIllustration = ({ className, animate }) => (
  <motion.div
    className={cx('illustration-wrapper', className)}
    initial="hidden"
    animate={animate && 'visible'}
    aria-hidden
  >
    <motion.img
      className={cx('window')}
      src={window}
      alt=""
      loading="lazy"
      variants={variantsAction}
    />
    <motion.div className={cx('popup-wrapper')} variants={variantsContentFade} custom={0.6}>
      <img className={cx('popup')} src={popup} alt="" loading="lazy" />
      <motion.img
        className={cx('item', 'item-1')}
        src={item1}
        alt=""
        loading="lazy"
        variants={variantsAction}
        custom={0.7}
      />
      <motion.img
        className={cx('item', 'item-2')}
        src={item2}
        alt=""
        loading="lazy"
        variants={variantsAction}
        custom={0.8}
      />
      <motion.img
        className={cx('item', 'item-3')}
        src={item3}
        alt=""
        loading="lazy"
        variants={variantsAction}
        custom={0.9}
      />
    </motion.div>
  </motion.div>
);

RemoteConfigIllustration.propTypes = {
  className: PropTypes.string,
  animate: PropTypes.bool,
};

RemoteConfigIllustration.defaultProps = {
  className: '',
  animate: false,
};

export default RemoteConfigIllustration;
