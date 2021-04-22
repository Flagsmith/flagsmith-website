import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';

import Pagination from 'components/shared/pagination';
import MainContext from 'context/main';

import Item from './item';
import styles from './podcasts-list.module.scss';

const cx = classNames.bind(styles);

const PodcastsList = ({ podcasts, rootPath }) => {
  const { pageCount, currentPage } = useContext(MainContext);
  const [currentPodcast, setCurrentPodcast] = useState(null);

  const podcastContent = podcasts.map((podcast) => podcast.content);
  const audioUrls = podcastContent.map((content) => {
    const parsedElement = new DOMParser().parseFromString(content, 'text/html');
    const audioElement = parsedElement.querySelector('audio');
    return audioElement.src;
  });

  return (
    <section className={cx('wrapper')}>
      <div className={cx('container', 'inner')}>
        <div className={cx('list')}>
          {podcasts.map((item, index) => {
            const podcastNumber = podcasts.length - index;
            const isCurrent = audioUrls[index] === currentPodcast;
            return (
              <Item
                podcastNumber={podcastNumber}
                isCurrent={isCurrent}
                key={index}
                audioUrl={audioUrls[index]}
                onStartPlay={setCurrentPodcast}
                {...item}
              />
            );
          })}
        </div>
        <Pagination pageCount={pageCount} currentPage={currentPage} rootPath={rootPath} />
      </div>
    </section>
  );
};
PodcastsList.propTypes = {
  podcasts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  rootPath: PropTypes.string.isRequired,
};

export default PodcastsList;
