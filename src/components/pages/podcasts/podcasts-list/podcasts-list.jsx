import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';

import FeaturedPost from 'components/shared/featured-post';
import Pagination from 'components/shared/pagination';
import MainContext from 'context/main';

import Item from './item';
import styles from './podcasts-list.module.scss';

const cx = classNames.bind(styles);

const PodcastsList = ({ podcasts, rootPath }) => {
  const { pageCount, currentPage } = useContext(MainContext);
  const [currentPodcast, setCurrentPodcast] = useState(null);

  const podcastUrls = podcasts.map((podcast) => podcast.acf.podcastUrl);

  return (
    <section className={cx('wrapper')}>
      <div className={cx('container', 'inner')}>
        <div className={cx('list')}>
          {podcasts.map((podcast, index) => {
            const isCurrent = podcastUrls[index] === currentPodcast;
            const { tags } = podcast;
            const hasBlogTag = Boolean(tags?.nodes.find((tag) => tag?.name === 'blog'));
            const { blogPost } = podcast.acf;
            return (
              <div className={cx('item')} key={index}>
                {hasBlogTag && blogPost ? (
                  <FeaturedPost post={blogPost} />
                ) : (
                  <Item
                    isCurrent={isCurrent}
                    audioUrl={podcastUrls[index]}
                    onStartPlay={setCurrentPodcast}
                    {...podcast}
                  />
                )}
              </div>
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
