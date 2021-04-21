import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import Item from './item';
import styles from './podcasts-list.module.scss';

const cx = classNames.bind(styles);

const PodcastsList = ({ podcasts }) => (
  <section className={cx('wrapper')}>
    <div className={cx('container', 'inner')}>
      {podcasts.map((item, index) => {
        const podcastNumber = podcasts.length - index;
        return <Item podcastNumber={podcastNumber} {...item} key={index} />;
      })}
    </div>
  </section>
);
PodcastsList.propTypes = {
  podcasts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default PodcastsList;
