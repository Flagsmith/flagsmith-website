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

const Options = ({ items, state, setState, isUserTouchedToggle }) => (
  <motion.div className={cx('wrapper')} initial="hidden" variants={variants}>
    <div className={cx('inner')}>
      <div className={cx('content')}>
        <span className={cx('title')}>Features</span>

        {items.map(({ label, key }) => {
          const withBorderGradient = key === 'dark';
          return (
            <div className={cx('item', key)} key={key}>
              {label}
              <button
                className={cx('switch-button', {
                  checked: state[key],
                  isUserTouchedToggle,
                })}
                onClick={() => setState(key)}
              >
                {withBorderGradient && <span className={cx('border-gradient')} />}
              </button>
            </div>
          );
        })}

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
      label: 'Chat',
      key: 'chat',
    },
    {
      label: 'Design 2.0',
      key: 'designV2',
    },
    {
      label: 'Dark mode',
      key: 'dark',
    },
  ],
};
export default Options;
