import classNames from 'classnames/bind';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import React from 'react';

import Button from 'components/shared/button';
import Heading from 'components/shared/heading';

import IconPlay from './images/play.inline.svg';
import SoundWave from './images/sound-wave.inline.svg';
import styles from './podcast-card.module.scss';

const cx = classNames.bind(styles);

const PodcastCard = ({ title, episode, duration, button }) => {
  const { playerIllustration } = useStaticQuery(graphql`
    query {
      playerIllustration: file(
        relativePath: { eq: "pages/blog/podcast-card/player-illustration.jpg" }
      ) {
        childImageSharp {
          gatsbyImageData(width: 1010)
        }
      }
    }
  `);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('head')}>
        <IconPlay className={cx('icon')} />
        <div className={cx('title')}>
          <Heading className={cx('heading')} tag="h2" size="lg" color="tertiary">
            {title}
          </Heading>
          <span className={cx('episode')}>Eps. {episode}</span>
          <span className={cx()}>{duration}</span>
        </div>
      </div>
      <SoundWave className={cx('wave')} />
      {/* TODO: make sound wave animation */}
      <Button className={cx('button')} to={button.url} theme="accent-tertiary">
        {button.title}
      </Button>
      <GatsbyImage
        className={cx('illustration')}
        image={getImage(playerIllustration)}
        alt=""
        aria-hidden
      />
    </div>
  );
};

PodcastCard.propTypes = {
  title: PropTypes.string.isRequired,
};

PodcastCard.defaultProps = {
  episode: '9',
  duration: '63:69',
  button: {
    url: '/podcasts',
    title: 'See all podcasts',
  },
};

export default PodcastCard;
