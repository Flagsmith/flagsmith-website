/* eslint-disable jsx-a11y/media-has-caption */
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect } from 'react';

import useAudio from 'hooks/use-audio';
import PauseIcon from 'icons/pause.inline.svg';
import PlayIcon from 'icons/play.inline.svg';
import VolumeIcon from 'icons/volume.inline.svg';

import styles from './audio.module.scss';
import Bar from './bar';

const cx = classNames.bind(styles);

const Audio = ({ audioUrl, isCurrent, setIsPlaying, onStartPlay }) => {
  const {
    audioRef,
    duration,
    setAudioTime,
    currentTime,
    audioState,
    setAudioState,
    setClickedTime,
    muteAudio,
    isMuted,
  } = useAudio(audioUrl);

  const playing = audioState === 'play';

  useEffect(() => {
    if (!isCurrent) {
      setAudioState('pause');
    }
  }, [isCurrent, setAudioState]);

  useEffect(() => {
    if (!setIsPlaying) {
      return;
    }
    if (playing) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  });

  const startPlay = useCallback(() => {
    setAudioState('play');

    if (onStartPlay) {
      onStartPlay(audioUrl);
    }
  }, [setAudioState, onStartPlay, audioUrl]);

  return (
    <div className={cx('wrapper')}>
      <audio
        preload="auto"
        ref={audioRef}
        muted={isMuted}
        playsInline
        onPlay={() => setAudioState('play')}
        onPause={() => setAudioState('pause')}
        onTimeUpdate={setAudioTime}
      >
        <source type="audio/mp3" src={audioUrl} />
        Your browser does not support the <code>audio</code> element.
      </audio>
      <div className={cx('controls', { audioPlay: playing })}>
        {playing ? (
          <PauseIcon className={cx('button')} onClick={() => setAudioState('pause')} />
        ) : (
          <PlayIcon className={cx('button')} onClick={startPlay} />
        )}
        <Bar
          className={cx('bar')}
          currentTime={currentTime}
          duration={duration}
          playing={playing}
          audioState={audioState}
          setAudioState={setAudioState}
          onTimeUpdate={(time) => setClickedTime(time)}
        />
        <VolumeIcon className={cx('icon-volume')} onClick={muteAudio} />
      </div>
    </div>
  );
};

Audio.propTypes = {};

Audio.defaultProps = {};

export default Audio;
