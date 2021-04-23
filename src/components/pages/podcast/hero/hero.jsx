import classNames from 'classnames/bind';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import React from 'react';

import Avatar from './avatar';
import styles from './hero.module.scss';

const cx = classNames.bind(styles);

const Hero = (props) => {
  const { authorName, authorPosition, guestName, guestPosition, logo, content } = props;
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
        {logo && <img src={logo} alt="" />}
        {content && <p className={cx('content')}>{content}</p>}
        <Avatar className={cx('avatar', 'host')} fullName={authorName} position={authorPosition} />
        <Avatar
          className={cx('avatar', 'guest')}
          fullName={guestName}
          position={guestPosition}
          theme="dark"
          isReversed
        />
        <GatsbyImage className={cx('background')} image={getImage(background)} alt="" />
      </div>
    </section>
  );
};

Hero.propTypes = {
  authorName: PropTypes.string.isRequired,
  authorPosition: PropTypes.string,
  guestName: PropTypes.string.isRequired,
  guestPosition: PropTypes.string.isRequired,
  content: PropTypes.string,
};

Hero.defaultProps = {
  authorPosition: 'Host Interview',
  content: '',
};

export default Hero;
