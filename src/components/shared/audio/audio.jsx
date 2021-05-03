import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';
import AudioPlayer from 'react-h5-audio-player';


import PauseIcon from 'icons/pause.inline.svg';
import PlayIcon from 'icons/play.inline.svg';
import UnmuteIcon from 'icons/unmute.inline.svg';
import VolumeIcon from 'icons/volume.inline.svg';

import styles from './audio.module.scss';
import useAudio from './use-audio';

const cx = classNames.bind(styles);

const Audio = ({ audioUrl, isCurrentPodcast, setCurrentPodcast, setIsCurrentPodcastPlaying }) => {
  const { audioRef, isPlaying, handlePlaying, controlsSection, progressBarSection } = useAudio(
    audioUrl,
    isCurrentPodcast,
    setCurrentPodcast,
    setIsCurrentPodcastPlaying
  );

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
        customProgressBarSection={progressBarSection}
        ref={audioRef}
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
