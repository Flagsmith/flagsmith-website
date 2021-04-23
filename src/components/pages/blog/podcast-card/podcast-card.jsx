import classNames from 'classnames/bind';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import Button from 'components/shared/button';
import Heading from 'components/shared/heading';
import Link from 'components/shared/link';

import IconMicrophone from './images/microphone.inline.svg';
import SoundWave from './images/sound-wave.inline.svg';
import styles from './podcast-card.module.scss';

const cx = classNames.bind(styles);

const PodcastCard = ({ title, acf: { podcastUrl, episode }, uri: url }) => {
  const [duration, setDuration] = useState(0);
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

  useEffect(() => {
    const audio = new Audio(podcastUrl);
    const getAudioDuration = (e) => {
      const { duration } = e.target;
      setDuration(duration);
    };
    audio.addEventListener('loadedmetadata', getAudioDuration);
    return () => audio.removeEventListener('loadedmetadata', getAudioDuration);
  }, [podcastUrl]);

  const timeDuration = `${Math.floor(duration / 60)}:${(duration % 60).toFixed()}`;

  return (
    <div className={cx('wrapper')}>
      <Link className={cx('head')} to={url}>
        <IconMicrophone className={cx('icon')} />
        <div className={cx('title-wrapper')}>
          <Heading className={cx('title')} tag="h2" size="lg" color="tertiary">
            {title}
          </Heading>
          <div className={cx('info')}>
            <span className={cx('episode')}>Eps. {episode}</span>
            <span>{timeDuration}</span>
          </div>
        </div>
      </Link>
      <SoundWave className={cx('wave')} />
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
    podcastUrl: PropTypes.string.isRequired,
    episode: PropTypes.number.isRequired,
  }).isRequired,
  uri: PropTypes.string.isRequired,
};

export default PodcastCard;
