import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import { MOTION_EASY } from 'constants/constants';
import styles from './state.module.scss';

import Avatar from './images/avatar.inline.svg';
import AvatarDefault from './images/avatar-default.inline.svg';
import Search from './images/search.inline.svg';
import Action1 from './images/action-1.inline.svg';
import Action2 from './images/action-2.inline.svg';
import Action1Default from './images/action-1-default.inline.svg';
import Action2Default from './images/action-2-default.inline.svg';
import chatIcon from './images/chat.svg';

const cx = classNames.bind(styles);

const variantsContent = {
  hidden: {
    opacity: 0,
  },
  visible: (custom) => ({
    opacity: 1,
    clipPath: 'polygon(0 0, 0 100%, 100% 100%, 100% 0)',
    transition: { delay: custom, duration: 0.7, ease: MOTION_EASY },
  }),
};

const variantsContentFade = {
  hidden: {
    opacity: 0,
  },
  visible: (custom) => ({
    opacity: 1,
    transition: { delay: custom, duration: 0.7, ease: MOTION_EASY },
  }),
};

const variantChat = {
  hidden: {
    opacity: 0,
    bottom: -90,
    transition: { delay: 0, duration: 0.7, ease: MOTION_EASY },
  },
  visible: (custom) => ({
    opacity: 1,
    bottom: 30,
    transition: { delay: custom, duration: 0.7, ease: MOTION_EASY },
  }),
};

const State = ({ chat, designV2, dark, setOption }) => {
  const controls = useAnimation();

  const [sectionRef, inView] = useInView({ threshold: 0.5, triggerOnce: true });

  const handleSetOption = (keyOption, wait) => {
    let timeout;

    const later = () => {
      clearTimeout(timeout);
      setOption(keyOption);
    };

    timeout = setTimeout(later, wait);
  };

  const animationSequence = async () => {
    await controls.start('visible');

    handleSetOption('designV2', 1500);
    handleSetOption('chat', 3000);
  };

  useEffect(() => {
    if (inView) {
      animationSequence();
    }
  }, [inView]);

  const {
    illustration: {
      childImageSharp: { fixed: illustration },
    },
  } = useStaticQuery(graphql`
    query {
      illustration: file(relativePath: { eq: "pages/home/hero/features/state/illustration.png" }) {
        childImageSharp {
          fixed(width: 560) {
            ...GatsbyImageSharpFixed_withWebp_noBase64
          }
        }
      }
    }
  `);

  return (
    <motion.div
      className={cx('wrapper', { dark }, { designV2 })}
      animate={controls}
      ref={sectionRef}
    >
      <div className={cx('illustration-wrapper')}>
        <Img className={cx('illustration')} fixed={illustration} alt="" />
      </div>

      {designV2 && (
        <motion.div
          initial="hidden"
          variants={variantsContentFade}
          animate={designV2 ? 'visible' : 'hidden'}
        >
          <Avatar className={cx('avatar')} />
        </motion.div>
      )}

      {!designV2 && (
        <motion.div
          initial="hidden"
          variants={variantsContentFade}
          animate={!designV2 ? 'visible' : 'hidden'}
        >
          <AvatarDefault className={cx('avatar')} />
        </motion.div>
      )}

      <motion.div initial="hidden" variants={variantsContentFade} animate={'visible'}>
        <Search className={cx('search')} />
      </motion.div>

      {designV2 && (
        <motion.div
          className={cx('actions')}
          initial="hidden"
          variants={variantsContent}
          animate={designV2 ? 'visible' : 'hidden'}
        >
          <Action1 className={cx('action', 'action-1')} />
          <Action2 className={cx('action', 'action-1')} />
        </motion.div>
      )}

      {!designV2 && (
        <motion.div
          className={cx('actions')}
          initial="hidden"
          variants={variantsContent}
          animate={!designV2 ? 'visible' : 'hidden'}
        >
          <Action1Default className={cx('action', 'action-1')} />
          <Action2Default className={cx('action', 'action-2')} />
        </motion.div>
      )}

      <motion.img
        className={cx('chat')}
        src={chatIcon}
        initial="hidden"
        alt=""
        animate={chat ? 'visible' : 'hidden'}
        variants={variantChat}
      />
    </motion.div>
  );
};

export default State;
