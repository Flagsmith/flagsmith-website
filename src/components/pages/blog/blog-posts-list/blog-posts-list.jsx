import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';

import FeaturedPost from 'components/shared/featured-post';
import Heading from 'components/shared/heading';
import Pagination from 'components/shared/pagination';
import MainContext from 'context/main';

import PodcastCard from '../podcast-card';

import styles from './blog-posts-list.module.scss';
import Item from './item';

const cx = classNames.bind(styles);

const BlogPostsList = ({ pageTitle, featuredPost, posts, rootPath }) => {
  const { pageCount, currentPage } = useContext(MainContext);
  return (
    <section className={cx('wrapper')}>
      <div className={cx('container', 'inner')}>
        <Heading className={cx('title')} tag="h1" size="xl">
          {pageTitle}
        </Heading>
        <FeaturedPost {...featuredPost} />
        {posts.map((post, index) => {
          const { tags } = post;
          const hasPodcastTag = Boolean(tags?.nodes.find((tag) => tag?.name === 'podcast'));
          const { podcast } = post.acf;
          return (
            <div className={cx('item')} key={index}>
              {hasPodcastTag && podcast ? <PodcastCard {...podcast} /> : <Item {...post} />}
            </div>
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

export default BlogPostsList;
