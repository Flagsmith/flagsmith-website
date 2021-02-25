import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useInView } from 'react-intersection-observer';

import Heading from 'components/shared/heading/heading';

import styles from './item.module.scss';

import TraitsIcon from './images/traits.inline.svg';
import SegmentsIcon from './images/segments.inline.svg';
import RolloutsIcon from './images/rollouts.inline.svg';
import TrackIcon from './images/track.inline.svg';

const iconCollection = {
  traits: TraitsIcon,
  segments: SegmentsIcon,
  rollouts: RolloutsIcon,
  track: TrackIcon,
};

const cx = classNames.bind(styles);

const Item = ({ title, description, iconName }) => {
  const [sectionRef, inView] = useInView({
    threshold: 1,
    triggerOnce: true,
  });

  const Icon = iconCollection[iconName];

  return (
    <div className={cx('item', { active: inView })} ref={sectionRef}>
      <div className={cx('left')}>
        <Icon className={cx('icon')} />
        <span className={cx('icon-circle')} aria-hidden />
      </div>
      <article className={cx('content')}>
        <Heading className={cx('title')} tag="h3" size="lg">
          {title}
        </Heading>
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
