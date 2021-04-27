import classNames from 'classnames/bind';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import React from 'react';

import Heading from 'components/shared/heading';
import Link from 'components/shared/link';
import ApplePodcastIcon from 'icons/apple-podcasts.inline.svg';
import SpotifyIcon from 'icons/spotify.inline.svg';

import styles from './hero.module.scss';

const cx = classNames.bind(styles);

const icons = {
  applePodcast: ApplePodcastIcon,
  spotify: SpotifyIcon,
};

const Hero = ({ title, text, description, buttons }) => {
  const { podcastImage } = useStaticQuery(graphql`
    query {
      podcastImage: file(relativePath: { eq: "pages/podcasts/hero/podcast-image.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 810)
        }
      }
    }
  `);
  return (
    <section className={cx('wrapper')}>
      <div className={cx('container', 'inner')}>
        <div>
          <Heading className={cx('title')} innerHTML={title} />
          <div className={cx('text')} dangerouslySetInnerHTML={{ __html: text }} />
          <div className={cx('image-wrapper', 'md-visible')}>
            <GatsbyImage image={getImage(podcastImage)} alt="" />
          </div>
          <div className={cx('bottom')}>
            <div className={cx('buttons-wrapper')}>
              {buttons.map(({ buttonIcon, button: { url, target, title } }, index) => {
                const Icon = icons[buttonIcon];
                return (
                  <Link className={cx('button')} to={url} target={target} key={index}>
                    <Icon className={cx('button-icon')} />
                    <div className={cx('button-text')}>
                      <span>Listen on</span>
                      <span className={cx('button-name')}>{title}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className={cx('description')} dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        </div>
        <div className={cx('image-wrapper', 'md-hidden')}>
          <GatsbyImage image={getImage(podcastImage)} alt="" />
        </div>
      </div>
    </section>
  );
};

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      buttonIcon: PropTypes.string.isRequired,
      button: PropTypes.shape({
        url: PropTypes.string.isRequired,
        target: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      }),
    })
  ).isRequired,
};

export default Hero;