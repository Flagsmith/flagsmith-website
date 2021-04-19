import classNames from 'classnames/bind';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import React from 'react';

import Button from 'components/shared/button';
import Heading from 'components/shared/heading';
import Link from 'components/shared/link';

import IconPlay from './images/play.inline.svg';
import SoundWave from './images/sound-wave.inline.svg';
import styles from './podcast-card.module.scss';

const cx = classNames.bind(styles);

const PodcastCard = ({
  title,
  acf: {
    podcast: { uri: url },
  },
  episode,
  duration,
  button,
}) => {
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
        <Link className={cx('icon-wrapper')} to={url}>
          <IconPlay className={cx('icon')} />
        </Link>
        <div className={cx('title-wrapper')}>
          <Heading className={cx('title')} tag="h2" size="lg" color="tertiary">
            {title}
          </Heading>
          <div className={cx('info')}>
            <span className={cx('episode')}>Eps. {episode}</span>
            <span>{duration}</span>
          </div>
        </div>
      </div>
      <SoundWave className={cx('wave')} />
      {/* TODO: make sound wave animation */}
      <Button className={cx('button')} to="/podcasts/" theme="accent-tertiary">
        See all podcasts
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
  acf: PropTypes.shape({
    podcast: PropTypes.shape({
      uri: PropTypes.string.isRequired,
    }),
  }).isRequired,
  episode: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
};

export default PodcastCard;
