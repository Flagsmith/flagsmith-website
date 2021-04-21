import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import Heading from 'components/shared/heading';
import Link from 'components/shared/link';
import useAudio from 'hooks/use-audio';

import styles from './item.module.scss';

const cx = classNames.bind(styles);

const Item = ({ podcastNumber, title, content, acf: { description }, url }) => {
  const parsed = new DOMParser().parseFromString(content, 'text/html');
  const audioElement = parsed.querySelector('audio');

  const audio = new Audio(audioElement.src);
  const { audioDuration } = useAudio(audio);

  return (
    <div className={cx('wrapper')}>
      <Heading className={cx('title')} tag="h2" size="lg">
        <span className={cx('number')}>#{podcastNumber}</span> {title}
      </Heading>
      <span className={cx('duration')}>{audioDuration}</span>
      <p className={cx('description')}>{description}</p>
      <Link to={url} withArrow>
        Read More
      </Link>
    </div>
  );
};
Item.propTypes = {
  podcastNumber: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  acf: PropTypes.shape({
    description: PropTypes.string.isRequired,
  }).isRequired,
  url: PropTypes.string.isRequired,
};

export default Item;
