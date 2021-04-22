import classNames from 'classnames/bind';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './hero.module.scss';

const cx = classNames.bind(styles);

const Hero = (props) => {
  const { background } = useStaticQuery(graphql`
    query {
      podcastImage: file(relativePath: { eq: "pages/podcast/hero/background.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 1010)
        }
      }
    }
  `);
  return (
    <section className={cx('wrapper')}>
      <div className={cx('container')}>
        <GatsbyImage className={cx('background')} image={getImage(background)} alt="" />
      </div>
    </section>
  );
};

Hero.propTypes = {};

Hero.defaultProps = {};

export default Hero;
