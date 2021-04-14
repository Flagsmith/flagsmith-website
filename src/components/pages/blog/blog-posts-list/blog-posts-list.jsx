import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';

import Heading from 'components/shared/heading';
import MainContext from 'context/main';

import FeaturedPost from '../featured-post';
import Pagination from '../pagination';
import PodcastCard from '../podcast-card';

import styles from './blog-posts-list.module.scss';
import Item from './item';

const cx = classNames.bind(styles);

const BlogPostsList = ({ pageTitle, featuredPost, posts, rootPath }) => {
  const { pageCount, currentPage } = useContext(MainContext);
  return (
    <section className={cx('wrapper')}>
      <div className="container">
        <Heading className={cx('title')}>{pageTitle}</Heading>
        <FeaturedPost {...featuredPost} />
        {posts.map((post, index) => {
          const { tags } = post;
          const hasPodcastTag = Boolean(tags?.nodes.find((tag) => tag?.name === 'podcast'));
          return (
            <div key={index}>{hasPodcastTag ? <PodcastCard {...post} /> : <Item {...post} />}</div>
          );
        })}
        <Pagination pageCount={pageCount} currentPage={currentPage} rootPath={rootPath} />
      </div>
    </section>
  );
};

BlogPostsList.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  featuredPost: PropTypes.shape({}).isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  rootPath: PropTypes.string.isRequired,
};

BlogPostsList.defaultProps = {};

export default BlogPostsList;
