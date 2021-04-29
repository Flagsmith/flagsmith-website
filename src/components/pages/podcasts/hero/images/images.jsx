import classNames from 'classnames/bind';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import React from 'react';

import HeadphoneIcon from '../icons/headphones.inline.svg';
import Image1 from '../icons/image-1.inline.svg';
import Image2 from '../icons/image-2.inline.svg';
import MicrophoneIcon from '../icons/microphone.inline.svg';

import styles from './images.module.scss';

const cx = classNames.bind(styles);

const Images = ({ acf: { avatar }, firstName, lastName, className }) => {
  const { image3 } = useStaticQuery(graphql`
    query {
      image3: file(relativePath: { eq: "pages/podcasts/hero/image-3.png" }) {
        childImageSharp {
          gatsbyImageData(width: 460)
        }
      }
    }
  `);
  return (
    <div className={cx('wrapper', className)}>
      <div className={cx('box', 'purple')}>
        <div className={cx('inner')}>
          <div className={cx('host')}>
            <GatsbyImage className={cx('avatar')} image={getImage(avatar.localFile)} alt="" />
            <span className={cx('company')}>Flagsmith</span>
            <span className={cx('name')}>
              {firstName} {lastName}
            </span>
          </div>
          <div className={cx('icon', 'icon-microphone')}>
            <MicrophoneIcon />
          </div>
          <Image1 />
        </div>
      </div>
      <div className={cx('box', 'yellow')}>
        <div className={cx('inner')}>
          <div className={cx('icon', 'icon-headphones')}>
            <HeadphoneIcon />
          </div>
          <Image2 />
        </div>
      </div>
      <div className={cx('box', 'transparent')}>
        <GatsbyImage image={getImage(image3)} alt="" />
      </div>
    </div>
  );
};

Images.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  acf: PropTypes.shape({
    avatar: PropTypes.shape({
      localFile: PropTypes.shape({}),
    }).isRequired,
  }).isRequired,
  className: PropTypes.string,
};

Images.defaultProps = {
  firstName: null,
  lastName: null,
  className: null,
};

export default Images;
