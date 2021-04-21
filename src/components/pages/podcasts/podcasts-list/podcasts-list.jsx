import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';

import Pagination from 'components/shared/pagination';
import MainContext from 'context/main';

import Item from './item';
import styles from './podcasts-list.module.scss';

const cx = classNames.bind(styles);

const PodcastsList = ({ podcasts, rootPath }) => {
  const { pageCount, currentPage } = useContext(MainContext);
  return (
    <section className={cx('wrapper')}>
      <div className={cx('container', 'inner')}>
        <div className={cx('list')}>
          {podcasts.map((item, index) => {
            const podcastNumber = podcasts.length - index;
            return <Item podcastNumber={podcastNumber} {...item} key={index} />;
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
