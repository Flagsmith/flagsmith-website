import classNames from 'classnames/bind';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import React from 'react';

import Heading from 'components/shared/heading';
import Link from 'components/shared/link';

import styles from './item.module.scss';

const cx = classNames.bind(styles);

const Item = ({
  featuredImage,
  title,
  author: {
    node: { firstName, lastName },
  },
  date,
  acf: { description },
  url,
}) => {
  const fullDate = new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={cx('wrapper', { withImage: featuredImage })}>
      {featuredImage && (
        <div className={cx('image-wrapper')}>
          <GatsbyImage
            className={cx('image')}
            image={getImage(featuredImage.node.localFile)}
            alt=""
          />
        </div>
      )}
      <div className={cx('content')}>
        <Heading className={cx('title')} tag="h2" size="lg">
          {title}
        </Heading>
        <span className={cx('info')}>
          By {firstName} {lastName} on {fullDate}
        </span>
        <p className={cx('description')}>{description}</p>
        <Link className={cx('link')} to={url} withArrow>
          Read More
        </Link>
      </div>
    </div>
  );
};

Item.propTypes = {
  featuredImage: PropTypes.shape({
    node: PropTypes.shape({
      localFile: PropTypes.shape({}),
    }),
  }),
  title: PropTypes.string.isRequired,
  author: PropTypes.shape({
    node: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
  }).isRequired,
  date: PropTypes.string.isRequired,
  acf: PropTypes.shape({
    description: PropTypes.string,
  }),
  url: PropTypes.string.isRequired,
};

Item.defaultProps = {
  featuredImage: null,
  acf: {
    description: '',
  },
};

export default Item;
