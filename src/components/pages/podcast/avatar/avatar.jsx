import classNames from 'classnames/bind';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { defaultFormat } from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './avatar.module.scss';

const cx = classNames.bind(styles);

const Avatar = ({ fullName, position, photo, theme, isReversed, additionalClassName }) => {
  const { defaultPhoto } = useStaticQuery(graphql`
    query {
      defaultPhoto: file(relativePath: { eq: "pages/podcast/avatar/photo.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 80)
        }
      }
    }
  `);

  const image = photo ? photo.localFile : defaultPhoto;
  return (
    <div className={cx('wrapper', { reversed: isReversed }, additionalClassName)}>
      <div className={cx('image-wrapper')}>
        <GatsbyImage image={getImage(image)} alt="" />
      </div>
      {fullName && position && (
        <div className={cx('badge', theme)}>
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
