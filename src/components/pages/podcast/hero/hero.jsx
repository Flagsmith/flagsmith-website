import classNames from 'classnames/bind';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import React from 'react';

import Avatar from './avatar';
import styles from './hero.module.scss';
import companyLogo from './images/logo.svg';

const cx = classNames.bind(styles);

const Hero = (props) => {
  const { authorName, authorPosition, guestName, guestPosition, logo, quote } = props;
  const { leftBackground, rightBackground } = useStaticQuery(graphql`
    query {
      leftBackground: file(relativePath: { eq: "pages/podcast/hero/left-background.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 767)
        }
      }
      rightBackground: file(relativePath: { eq: "pages/podcast/hero/right-background.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 767)
        }
      }
    }
  `);
  return (
    <section className={cx('wrapper')}>
      <div className={cx('container', 'aspect-ratio')}>
        <div className={cx('inner')}>
          <div>
            {companyLogo && <img className={cx('logo')} src={companyLogo} alt="" />}
            {quote && <p className={cx('quote')}>{quote}</p>}
          </div>
          <Avatar
            additionalClassName={cx('avatar', 'host')}
            fullName={authorName}
            position={authorPosition}
          />
          <Avatar
            additionalClassName={cx('avatar', 'guest')}
            fullName={guestName}
            position={guestPosition}
            theme="dark"
            isReversed
          />
        </div>
        <div className={cx('background', 'left')}>
          <GatsbyImage image={getImage(leftBackground)} alt="" />
        </div>
        <div className={cx('background', 'right')}>
          <GatsbyImage fadeIn="false" image={getImage(rightBackground)} alt="" />
        </div>
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
