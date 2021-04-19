import classNames from 'classnames/bind';
import { motion } from 'framer-motion';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React, { useState, useEffect } from 'react';

import { MOTION_EASY } from 'constants/constants';

import Action1Default from './images/action-1-default.inline.svg';
import Action1 from './images/action-1.inline.svg';
import Action2Default from './images/action-2-default.inline.svg';
import Action2 from './images/action-2.inline.svg';
import AvatarDefault from './images/avatar-default.inline.svg';
import Avatar from './images/avatar.inline.svg';
import chatIcon from './images/chat.svg';
import Search from './images/search.inline.svg';
import styles from './state.module.scss';

const DELAY_BEFORE_ANIMATION_SEC = 0.4;

const cx = classNames.bind(styles);

const variantsContentFade = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { delay: DELAY_BEFORE_ANIMATION_SEC, duration: 0.8, ease: MOTION_EASY },
  },
};

const variantsContentFadeOut = {
  hidden: {
    opacity: 0,
    transition: { delay: DELAY_BEFORE_ANIMATION_SEC, duration: 0.8, ease: MOTION_EASY },
  },
  visible: {
    opacity: 1,
  },
};

const variantsActionsFade = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    clipPath: 'polygon(0 0, 0 100%, 100% 100%, 100% 0)',
    transition: { delay: DELAY_BEFORE_ANIMATION_SEC, duration: 0.8, ease: MOTION_EASY },
  },
};

const variantsActionsFadeOut = {
  hidden: {
    opacity: 0,
    transition: { delay: DELAY_BEFORE_ANIMATION_SEC, duration: 0.8, ease: MOTION_EASY },
  },
  visible: {
    opacity: 1,
    clipPath: 'polygon(0 0, 0 100%, 100% 100%, 100% 0)',
  },
};

const variantChat = {
  hidden: {
    opacity: 0,
    bottom: -90,
    transition: { delay: 0, duration: 0.7, ease: MOTION_EASY },
  },
  visible: {
    opacity: 1,
    bottom: 30,
    transition: { delay: DELAY_BEFORE_ANIMATION_SEC, duration: 0.7, ease: MOTION_EASY },
  },
};

const illustrationWrapperVariants = {
  initial: {},
  animate: {
    top: 0,
    right: 0,
    left: 0,
    width: '100%',
    transition: { delay: DELAY_BEFORE_ANIMATION_SEC, duration: 0.3, ease: MOTION_EASY },
  },
};

const State = ({ chat, designV2, dark, animationIsCompleted }) => {
  const { illustration } = useStaticQuery(graphql`
    query {
      illustration: file(relativePath: { eq: "pages/home/hero/features/state/illustration.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 560)
        }
      }
    }
  `);

  // apply designV2 css classes with delay
  const [addV2Class, setAddV2Class] = useState(designV2);
  useEffect(() => {
    if (designV2) {
      setTimeout(() => setAddV2Class(true), 400);
    } else {
      setAddV2Class(false);
    }
  }, [designV2]);

  return (
    <div className={cx('wrapper')}>
      <motion.div className={cx('inner', { dark }, { designV2: addV2Class })}>
        <motion.div
          className={cx('illustration-wrapper')}
          initial="initial"
          variants={illustrationWrapperVariants}
          animate={!designV2 ? 'initial' : 'animate'}
        >
          <GatsbyImage
            loading="eager"
            className={cx('illustration')}
            image={getImage(illustration)}
            imgStyle={{ objectPosition: 'right top' }}
            alt=""
          />
        </motion.div>

        <motion.div
          initial="hidden"
          variants={variantsContentFade}
          animate={designV2 ? 'visible' : 'hidden'}
        >
          <Avatar className={cx('avatar')} />
        </motion.div>

        <motion.div
          initial={!animationIsCompleted ? 'visible' : 'hidden'}
          variants={variantsContentFadeOut}
          animate={!designV2 ? 'visible' : 'hidden'}
        >
          <AvatarDefault className={cx('avatar', 'default')} />
        </motion.div>

        <div className={cx('search', 'searchV2' && addV2Class)}>
          <Search />
        </div>

        <motion.div
          className={cx('actions')}
          initial="hidden"
          variants={variantsActionsFade}
          animate={designV2 ? 'visible' : 'hidden'}
        >
          <Action1 className={cx('action', 'action-1')} />
          <Action2 className={cx('action', 'action-1')} />
        </motion.div>

        <motion.div
          className={cx('actions', 'default')}
          initial={!animationIsCompleted ? 'visible' : 'hidden'}
          variants={variantsActionsFadeOut}
          animate={!designV2 ? 'visible' : 'hidden'}
        >
          <Action1Default className={cx('action', 'action-1', 'default')} />
          <Action2Default className={cx('action', 'action-2', 'default')} />
        </motion.div>

        <motion.img
          className={cx('chat')}
          src={chatIcon}
          initial="hidden"
          alt=""
          animate={chat ? 'visible' : 'hidden'}
          variants={variantChat}
        />
      </motion.div>
    </div>
  );
};

export default State;
