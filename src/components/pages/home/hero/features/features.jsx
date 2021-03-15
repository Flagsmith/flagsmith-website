import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import classNames from 'classnames/bind';
import { useInView } from 'react-intersection-observer';

import Code from './code';
import Options from './options';
import State from './state';

import styles from './features.module.scss';

import shape1 from './images/shape-1.url.svg';
import shape2 from './images/shape-2.url.svg';
import shapeAddition from './images/shape-addition.url.svg';
import shapeEqual from './images/shape-equal.url.svg';

const cx = classNames.bind(styles);

const Features = (props) => {
  const controls = useAnimation();
  const [isUserTouchedToggle, setIsUserTouchedToggle] = useState(false);
  const [animationIsCompleted, setAnimationIsCompleted] = useState(false);
  const [sectionRef, inView] = useInView({ threshold: 0.5, triggerOnce: true });

  const [state, setState] = useState({
    chat: false,
    designV2: false,
    dark: false,
  });

  const handleSetState = (key, manual = true) => {
    !isUserTouchedToggle && manual == true && setIsUserTouchedToggle(true);
    setState((prevState) => ({ ...prevState, [key]: !prevState[key] }));
  };

  const handleTimeout = (keyOption, wait) => {
    let timeout;

    const later = () => {
      clearTimeout(timeout);
      handleSetState(keyOption, false);
    };

    timeout = setTimeout(later, wait);
  };

  const animationSequence = async () => {
    let timeoutAnimationComplete;

    await controls.start('appear');

    handleTimeout('chat', 0);
    handleTimeout('designV2', 1000);

    timeoutAnimationComplete = setTimeout(() => {
      clearTimeout(timeoutAnimationComplete);
      setAnimationIsCompleted(true);
    }, 2000);
  };

  useEffect(() => {
    if (inView) {
      animationSequence();
    }
  }, [inView]);

  return (
    <motion.div className={cx('wrapper')} animate={controls} ref={sectionRef}>
      <Code {...props} />
      <Options
        state={state}
        setState={handleSetState}
        isUserTouchedToggle={isUserTouchedToggle}
        animationIsCompleted={animationIsCompleted}
      />
      <State animationIsCompleted={animationIsCompleted} {...state} />

      <img
        className={cx('shape-sum', 'shape-addition')}
        src={shapeAddition}
        alt=""
        loading="lazy"
        aria-hidden
      />
      <img
        className={cx('shape-sum', 'shape-equal')}
        src={shapeEqual}
        alt=""
        loading="lazy"
        aria-hidden
      />
      <img className={cx('shape', 'shape-1')} src={shape1} alt="" loading="lazy" aria-hidden />
      <img className={cx('shape', 'shape-2')} src={shape2} alt="" loading="lazy" aria-hidden />
    </motion.div>
  );
};

export default Features;
