import classNames from 'classnames/bind';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './avatar.module.scss';

const cx = classNames.bind(styles);

const Avatar = ({ fullName, position, photo, theme, isReversed, additionalClassName }) => {
  const { logo } = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { eq: "pages/podcast-post/avatar/logo.png" }) {
        childImageSharp {
          gatsbyImageData(width: 80)
        }
      }
    }
  `);

  return (
    <div className={cx('wrapper', { reversed: isReversed }, additionalClassName)}>
      {photo && (
        <div className={cx('image-wrapper')}>
          <GatsbyImage image={getImage(photo.localFile || logo)} alt={photo.altText} />
        </div>
      )}
      {fullName && position && (
        <div className={cx('badge', theme, { withPhoto: photo })}>
          <span>{fullName}</span>
          <span>{position}</span>
        </div>
      )}
    </div>
  );
};

Avatar.propTypes = {
  fullName: PropTypes.string,
  position: PropTypes.string,
  theme: PropTypes.oneOf(['light', 'dark']),
  isReversed: PropTypes.bool,
  additionalClassName: PropTypes.string,
};

Avatar.defaultProps = {
  fullName: '',
  position: '',
  theme: 'light',
  isReversed: false,
  additionalClassName: null,
};

export default Avatar;
