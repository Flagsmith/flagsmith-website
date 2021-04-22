import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect } from 'react';

import useAudio from 'hooks/use-audio';
import DownloadIcon from 'icons/download.inline.svg';
import PauseIcon from 'icons/pause.inline.svg';
import PlayIcon from 'icons/play.inline.svg';
import VolumeIcon from 'icons/volume.inline.svg';

import styles from './audio.module.scss';
import Bar from './bar';

const cx = classNames.bind(styles);

const Audio = ({ audioUrl, isCurrent, onStartPlay, podcastNumber }) => {
  const {
    duration,
    currentTime,
    playing,
    setPlaying,
    setClickedTime,
    isMuted,
    setIsMuted,
  } = useAudio(audioUrl);
  useEffect(() => {
    if (!isCurrent) {
      setPlaying(false);
    }
  }, [isCurrent, setPlaying]);

  const startPlay = useCallback(() => {
    setPlaying(true);
    onStartPlay(podcastNumber);
  }, [onStartPlay, setPlaying, podcastNumber]);

  const handleVolumeAudio = () => setIsMuted(!isMuted);

  return (
    <div className={cx('wrapper')}>
      <audio preload="auto">
        <source src={audioUrl} />
        Your browser does not support the <code>audio</code> element.
      </audio>
      <div className={cx('controls', { audioPlay: playing })}>
        {playing ? (
          <PauseIcon className={cx('button')} onClick={() => setPlaying(false)} />
        ) : (
          <PlayIcon className={cx('button')} onClick={startPlay} />
        )}
        <Bar
          className={cx('bar')}
          currentTime={currentTime}
          duration={duration}
          playing={playing}
          setPlaying={setPlaying}
          onTimeUpdate={(time) => setClickedTime(time)}
        />
        <VolumeIcon className={cx('icon-volume')} onClick={handleVolumeAudio} />
        <DownloadIcon className={cx('icon-download')} />
      </div>
    </div>
  );
};

Audio.propTypes = {};

Audio.defaultProps = {};

export default Audio;
