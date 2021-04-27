import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Audio from 'components/shared/audio';
import Heading from 'components/shared/heading';
import Link from 'components/shared/link';

import EqualizerIcon from './images/equalizer.inline.svg';
import styles from './item.module.scss';

const cx = classNames.bind(styles);

const Item = ({ title, acf: { description, episode }, url, audioUrl, isCurrent, onStartPlay }) => {
  const [isCurrentPodcastPlaying, setIsCurrentPodcastPlaying] = useState(false);

  return (
    <div className={cx('wrapper', { currentAudio: isCurrentPodcastPlaying })}>
      <EqualizerIcon className={cx('icon')} />
      <div className={cx('inner')}>
        <Link to={url}>
          <Heading className={cx('title')} tag="h2" size="lg">
            <span>#{episode}</span> {title}
          </Heading>
        </Link>
        <p className={cx('description')}>{description}</p>
        <Audio
          audioUrl={audioUrl}
          isCurrent={isCurrent}
          setIsPlaying={setIsCurrentPodcastPlaying}
          onStartPlay={onStartPlay}
        />
        <Link className={cx('link')} to={url} withArrow>
          View Transcription
        </Link>
      </div>
    </div>
  );
};

Item.propTypes = {
  title: PropTypes.string.isRequired,
  acf: PropTypes.shape({
    description: PropTypes.string.isRequired,
    episode: PropTypes.number.isRequired,
  }).isRequired,
  url: PropTypes.string.isRequired,
};

export default Item;
