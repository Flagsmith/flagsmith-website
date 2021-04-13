import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import Heading from 'components/shared/heading';

import FeaturedPost from '../featured-post';
import PodcastCard from '../podcast-card';

import styles from './blog-posts-list.module.scss';
import Item from './item';

const cx = classNames.bind(styles);

const BlogPostsList = ({ pageTitle, featuredPost, items, podcastCard }) => (
  <section className={cx('wrapper')}>
    <div className="container">
      <Heading className={cx('title')}>{pageTitle}</Heading>
      <FeaturedPost {...featuredPost} />
      {items.map((item, index) => (
        <Item key={index} {...item} />
      ))}
      <PodcastCard {...podcastCard} />
    </div>
  </section>
);

BlogPostsList.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  featuredPost: PropTypes.shape({}).isRequired,
};

BlogPostsList.defaultProps = {};

export default BlogPostsList;
