import classNames from 'classnames/bind';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './logos.module.scss';

const cx = classNames.bind(styles);

const Logos = ({ title, items }) => (
  <>
    <p className={cx('title')}>{title}</p>
    <div className={cx('items-wrapper')}>
      {items.map(({ localFile, altText }, index) => {
        const image = localFile.childImageSharp;
        return (
          <GatsbyImage className={cx('item')} image={getImage(image)} alt={altText} key={index} />
        );
      })}
    </div>
  </>
);

Logos.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Logos;
