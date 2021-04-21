import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import Link from 'components/shared/link';

import IconArrow from './images/arrow.inline.svg';
import styles from './pagination.module.scss';

const cx = classNames.bind(styles);

const Pagination = ({ rootPath, pageCount, currentPage }) => {
  const isFirst = currentPage === 1;
  const isLast = currentPage === pageCount;
  const prevPage = currentPage - 1 === 1 ? rootPath : rootPath + (currentPage - 1).toString();
  const nextPage = rootPath + (currentPage + 1).toString();
  return (
    <>
      {pageCount ? (
        <div className={cx('wrapper')}>
          {!isFirst && (
            <Link className={cx('item', 'previous')} to={prevPage}>
              <IconArrow />
              <span>Newer</span>
            </Link>
          )}
          {!isLast && (
            <Link className={cx('item', 'next')} to={nextPage}>
              <span>Older</span>
              <IconArrow />
            </Link>
          )}
        </div>
      ) : null}
    </>
  );
};

Pagination.propTypes = {
  rootPath: PropTypes.string.isRequired,
  pageCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
