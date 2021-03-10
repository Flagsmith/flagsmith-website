import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Img from 'gatsby-image';
import styles from './logos.module.scss';

const cx = classNames.bind(styles);

const Logos = ({ title, items }) => (
  <>
    <p className={cx('title')}>{title}</p>
    <div className={cx('items-wrapper')}>
      {items.map(({ localFile, altText }, index) => {
        const image = localFile.childImageSharp.fluid;
        return <Img className={cx('item')} fluid={image} alt={altText} key={index} />;
      })}
    </div>
  </>
);

Logos.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Logos;
