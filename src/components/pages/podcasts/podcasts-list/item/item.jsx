import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import Heading from 'components/shared/heading';
import Link from 'components/shared/link';

import Audio from './audio';
import styles from './item.module.scss';

const cx = classNames.bind(styles);

const Item = ({
  podcastNumber,
  title,
  acf: { description, episode },
  url,
  audioUrl,
  isCurrent,
  onStartPlay,
}) => (
  <div className={cx('wrapper')}>
    <Heading className={cx('title')} tag="h2" size="lg">
      <span className={cx('number')}>#{episode}</span> {title}
    </Heading>
    <p className={cx('description')}>{description}</p>
    <Audio
      audioUrl={audioUrl}
      isCurrent={isCurrent}
      podcastNumber={podcastNumber}
      onStartPlay={onStartPlay}
    />
    <Link className={cx('link')} to={url} withArrow>
      View Transcription
    </Link>
  </div>
);
Item.propTypes = {
  podcastNumber: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  acf: PropTypes.shape({
    description: PropTypes.string.isRequired,
    episode: PropTypes.number.isRequired,
  }).isRequired,
  url: PropTypes.string.isRequired,
};

export default Item;
