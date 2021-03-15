import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useInView } from 'react-intersection-observer';

import { motion } from 'framer-motion';
import { MOTION_EASY } from 'constants/constants';

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

const variantsBorder = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { duration: 2.5, ease: MOTION_EASY },
  },
};

const variantsBorderGradient = {
  visible: {
    rotate: 360,
    transition: { repeat: Infinity, duration: 2.5, ease: MOTION_EASY },
  },
};

const Options = ({ items, state, setState, isUserTouchedToggle, animationIsCompleted }) => {
  const [sectionRef, inView] = useInView({ threshold: 0.5 });
  return (
    <motion.div className={cx('wrapper')} initial="hidden" variants={variants} ref={sectionRef}>
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
                  {withBorderGradient && (
                    <motion.span
                      className={cx('border')}
                      initial="hidden"
                      animate={
                        animationIsCompleted && !isUserTouchedToggle && inView
                          ? 'visible'
                          : 'hidden'
                      }
                      variants={variantsBorder}
                    >
                      <motion.span
                        className={cx('border-gradient')}
                        variants={variantsBorderGradient}
                      />
                    </motion.span>
                  )}
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
};

Options.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleSetState: PropTypes.func.isRequired,
  isUserTouchedToggle: PropTypes.bool.isRequired,
  animationIsCompleted: PropTypes.bool.isRequired,
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
