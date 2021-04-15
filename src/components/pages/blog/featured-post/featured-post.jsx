import classNames from 'classnames/bind';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import React from 'react';

import Button from 'components/shared/button';
import Heading from 'components/shared/heading';

import styles from './featured-post.module.scss';
import IconStar from './images/star.inline.svg';

const cx = classNames.bind(styles);

const FeaturedPost = ({
  post: {
    title,
    author: {
      node: { firstName, lastName },
    },
    date,
    acf: { description },
    url,
  },
}) => {
  const { bookIllustration } = useStaticQuery(graphql`
    query {
      bookIllustration: file(
        relativePath: { eq: "pages/blog/featured-post/book-illustration.jpg" }
      ) {
        childImageSharp {
          gatsbyImageData(width: 840)
        }
      }
    }
  `);

  const fullDate = new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={cx('wrapper')}>
      <IconStar className={cx('icon')} />
      <div className={cx('inner')}>
        <Heading className={cx('title')} tag="h2" size="lg">
          {title}
        </Heading>
        <span className={cx('info')}>
          By {firstName} {lastName} on {fullDate}
        </span>
        <p className={cx('description')}>{description}</p>
        <Button className={cx('button')} to={url}>
          Read more
        </Button>
      </div>
      <div className={cx('illustration-wrapper')}>
        <GatsbyImage
          className={cx('illustration')}
          image={getImage(bookIllustration)}
          alt=""
          aria-hidden
        />
      </div>
    </div>
  );
};

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.shape({
      node: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
      }),
    }).isRequired,
    date: PropTypes.string.isRequired,
    acf: PropTypes.shape({
      description: PropTypes.string.isRequired,
    }),
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedPost;
