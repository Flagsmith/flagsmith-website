import classNames from 'classnames/bind';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import React from 'react';

import Heading from 'components/shared/heading';
import Link from 'components/shared/link';
import IconArrowRight from 'icons/arrow-right.inline.svg';
import getLocaleDate from 'utils/get-locale-date';

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
  const fullDate = getLocaleDate(date);
  return (
    <Link
      className={cx('wrapper', { withImage: featuredImage }, { withoutDescription: !description })}
      to={url}
    >
      {featuredImage && (
        <div className={cx('image-wrapper', 'sm-hidden')}>
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
        {featuredImage && (
          <div className={cx('image-wrapper', 'sm-visible')}>
            <GatsbyImage
              className={cx('image')}
              image={getImage(featuredImage.node.localFile)}
              alt=""
            />
          </div>
        )}
        <span className={cx('info')}>
          By {firstName} {lastName} on {fullDate}
        </span>
        {description && <p className={cx('description')}>{description}</p>}
        <span className={cx('item-link')}>
          Read More <IconArrowRight />
        </span>
      </div>
    </Link>
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
