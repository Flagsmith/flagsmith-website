import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

import Heading from 'components/shared/heading/heading';
import Link from 'components/shared/link/link';
import { MOTION_EASY } from 'constants/constants';
import styles from './remote-config.module.scss';

import Icon from './images/icon.inline.svg';
import IconArrowRight from 'icons/arrow-right.inline.svg';
import window from './images/window.url.svg';
import popup from './images/popup.url.svg';
import item1 from './images/item-1.url.svg';
import item2 from './images/item-2.url.svg';
import item3 from './images/item-3.url.svg';

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

const RemoteConfig = ({ title, description }) => {
  const [animationContainer, animationContainerView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });
  return (
    <section className={cx('wrapper')}>
      <div className={cx('container', 'inner')}>
        <div className={cx('left')}>
          <Icon className={cx('icon')} />
          <Heading className={cx('title')} tag="h2" size="xl">
            {title}
          </Heading>
          <div className={cx('description')} dangerouslySetInnerHTML={{ __html: description }} />
          <Link className={cx('link', 'icon-arrow')} to="/">
            Learn More <IconArrowRight />
          </Link>
        </div>
        <div className={cx('right')} ref={animationContainer}>
          <motion.div
            className={cx('illustration-wrapper')}
            initial="hidden"
            animate={animationContainerView && 'visible'}
            aria-hidden
          >
            <motion.img
              className={cx('window')}
              src={window}
              alt=""
              loading="lazy"
              variants={variantsAction}
            />
            <motion.img
              className={cx('popup')}
              src={popup}
              alt=""
              loading="lazy"
              variants={variantsContentFade}
              custom={0.6}
            />
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
        </div>
      </div>
    </section>
  );
};

RemoteConfig.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

RemoteConfig.defaultProps = {
  title: 'Remote config',
  description: `<ul>
    <li>With Flagsmith’s remote config capabilities, you can easily change or test out different feature properties without deploying new code.</li>
    <li>Configure different elements of your features–like the font size of a header or color of a CTA button–directly through Flagsmith and release the changes to users in just a few clicks.</li>
  </ul>`,
};

export default RemoteConfig;
