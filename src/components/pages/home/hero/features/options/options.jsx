import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { motion } from 'framer-motion';
import styles from './options.module.scss';

import Logo from './images/logo.inline.svg';

const cx = classNames.bind(styles);

const variants = {
  hidden: {
    width: '0%',
    transform: 'scale(0.6)',
    opacity: 0,
  },
  appear: {
    width: '35%',
    opacity: 1,
    transform: 'scale(1)',
    transition: { delay: 0.5, type: 'spring', damping: 13 },
  },
};

const Options = ({ items, state, setState }) => (
  <motion.div className={cx('wrapper')} initial="hidden" variants={variants}>
    <div className={cx('inner')}>
      <div className={cx('content')}>
        <span className={cx('title')}>feautures</span>

        {items.map(({ label, key }) => (
          <div className={cx('item', key)} key={key}>
            {label}
            <button
              className={cx('switch-button', {
                checked: state[key],
              })}
              onClick={() => setState(key)}
            />
          </div>
        ))}

        <div className={cx('footer')}>
          <Logo />
        </div>
      </div>
      <div></div>
    </div>
  </motion.div>
);

Options.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleSetState: PropTypes.func.isRequired,
};

Options.defaultProps = {
  items: [
    {
      label: 'Design 2.0',
      key: 'designV2',
    },
    {
      label: 'Chat',
      key: 'chat',
    },
    {
      label: 'Dark mode',
      key: 'dark',
    },
  ],
};
export default Options;
