import classNames from 'classnames/bind';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';

import useSectionOffset from 'hooks/use-section-offset';


import RolloutsIconActive from './images/rollouts-active.inline.svg';
import RolloutsIcon from './images/rollouts.inline.svg';
import SegmentsIconActive from './images/segments-active.inline.svg';
import SegmentsIcon from './images/segments.inline.svg';
import TrackIconActive from './images/track-active.inline.svg';
import TrackIcon from './images/track.inline.svg';
import TraitsIconActive from './images/traits-active.inline.svg';
import TraitsIcon from './images/traits.inline.svg';
import styles from './item.module.scss';

const iconCollection = {
  traits: TraitsIcon,
  segments: SegmentsIcon,
  rollouts: RolloutsIcon,
  track: TrackIcon,
};

const iconCollectionActive = {
  traits: TraitsIconActive,
  segments: SegmentsIconActive,
  rollouts: RolloutsIconActive,
  track: TrackIconActive,
};

const cx = classNames.bind(styles);

const variantsY = ['0%', '20%', '40%', '80%', '100%'];
const variantsIntervals = [0, 0.2, 0.4, 0.8, 1];
const variantsOpacity = [0, 1, 1, 1, 1];
const variantsColor = ['#1e0d26', '#22194d', '#22194d', '#22194d', '#22194d'];

const Item = ({ title, description, iconName }) => {
  const sectionRef = useRef();
  const { scrollYProgress } = useViewportScroll();
  const { scrollPercentageStart, scrollPercentageEnd } = useSectionOffset(sectionRef);

  const inputRange = variantsIntervals.map(
    (input) => scrollPercentageStart + (scrollPercentageEnd - scrollPercentageStart) * input
  );

  const getProgressBarStyle = () => {
    const height = useTransform(scrollYProgress, inputRange, variantsY);

    return {
      height,
    };
  };

  const getItemStyle = () => {
    const opacity = useTransform(scrollYProgress, inputRange, variantsOpacity);

    return {
      opacity,
    };
  };

  const getColor = () => {
    const color = useTransform(scrollYProgress, inputRange, variantsColor);

    return { color };
  };

  const Icon = iconCollection[iconName];
  const IconActive = iconCollectionActive[iconName];

  return (
    <div className={cx('item')} ref={sectionRef}>
      <div className={cx('left')}>
        <motion.div className={cx('progress-bar')} style={getProgressBarStyle()} />
        <div className={cx('icon-wrapper')}>
          <Icon className={cx('icon')} />
          <motion.div className={cx('icon', 'active')} style={getItemStyle()}>
            <IconActive />
          </motion.div>
        </div>
      </div>
      <article className={cx('content')}>
        <motion.h3 className={cx('title')} style={getColor()}>
          {title}
        </motion.h3>
        <p className={cx('description')}>{description}</p>
      </article>
    </div>
  );
};

Item.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
};

export default Item;
