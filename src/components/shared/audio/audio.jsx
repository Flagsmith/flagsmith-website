import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';

import PauseIcon from 'icons/pause.inline.svg';
import PlayIcon from 'icons/play.inline.svg';
import UnmuteIcon from 'icons/unmute.inline.svg';
import VolumeIcon from 'icons/volume.inline.svg';

import styles from './audio.module.scss';

const cx = classNames.bind(styles);

const Audio = ({ audioUrl, isCurrentPodcast, setCurrentPodcast, setIsCurrentPodcastPlaying }) => {
  const player = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

  // More details:
  // https://static.hanzluo.com/react-h5-audio-player-storybook/index.html?path=/docs/layouts-advanced--stacked
  const [controlsSection, setControlsSection] = useState([RHAP_UI.MAIN_CONTROLS]);
  const [customProgressBarSection, setProgressBarSection] = useState([
    RHAP_UI.PROGRESS_BAR,
    RHAP_UI.CURRENT_TIME,
    RHAP_UI.DURATION,
    RHAP_UI.VOLUME_CONTROLS,
  ]);

  const handlePlaying = () => setIsPlaying(!isPlaying);

  const handleSetCustomControls = () => {
    const mediaQuery = window.matchMedia('(max-width: 1439.98px)');

    if (mediaQuery.matches) {
      setControlsSection([
        RHAP_UI.MAIN_CONTROLS,
        RHAP_UI.CURRENT_TIME,
        RHAP_UI.DURATION,
        RHAP_UI.VOLUME_CONTROLS,
      ]);
      setProgressBarSection([RHAP_UI.PROGRESS_BAR]);
    } else {
      setControlsSection([RHAP_UI.MAIN_CONTROLS]);
      setProgressBarSection([
        RHAP_UI.PROGRESS_BAR,
        RHAP_UI.CURRENT_TIME,
        RHAP_UI.DURATION,
        RHAP_UI.VOLUME_CONTROLS,
      ]);
    }
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (typeof window !== 'undefined') {
      handleSetCustomControls();

      window.addEventListener('resize', handleSetCustomControls);

      return () => {
        window.removeEventListener('resize', handleSetCustomControls);
      };
    }
  }, []);

  useEffect(() => {
    if (!setIsCurrentPodcastPlaying) {
      return;
    }
    // highlight a playable item on a podcast page
    if (isPlaying) {
      setCurrentPodcast(audioUrl);
      setIsCurrentPodcastPlaying(true);
    } else {
      setIsCurrentPodcastPlaying(false);
    }
  }, [isPlaying, setIsCurrentPodcastPlaying, audioUrl, setCurrentPodcast]);

  useEffect(() => {
    if (typeof isCurrentPodcast === 'undefined') {
      return;
    }
    // pause and play when switching between podcasts
    if (isCurrentPodcast) {
      player.current.audio.current.play();
    } else {
      player.current.audio.current.pause();
    }
  }, [isCurrentPodcast]);

  return (
    <div className={cx('wrapper')}>
      <AudioPlayer
        className={cx('player', { audioPlay: isPlaying })}
        src={audioUrl}
        showJumpControls={false}
        customIcons={{
          play: <PlayIcon />,
          pause: <PauseIcon />,
          volume: <VolumeIcon />,
          volumeMute: <UnmuteIcon />,
        }}
        customControlsSection={controlsSection}
        customProgressBarSection={customProgressBarSection}
        ref={player}
        onPlay={handlePlaying}
        onPause={handlePlaying}
      />
    </div>
  );
};

Audio.defaultProps = {
  setCurrentPodcast: null,
  setIsCurrentPodcastPlaying: null,
};

Audio.propTypes = {
  audioUrl: PropTypes.string.isRequired,
  setCurrentPodcast: PropTypes.func,
  setIsCurrentPodcastPlaying: PropTypes.func,
};

export default Audio;
