/* eslint-disable jsx-a11y/no-static-element-interactions */
import classNames from 'classnames/bind';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';

import styles from './bar.module.scss';

const cx = classNames.bind(styles);

const Bar = ({ className, duration, currentTime, onTimeUpdate, playing, setAudioState }) => {
  const curPercentage = (currentTime / duration) * 100;
  const barRef = useRef();

  const formatDuration = (duration) => {
    if (duration <= 3600) {
      return moment.duration(duration, 'seconds').format('mm:ss', { trim: false });
    }
    return moment.duration(duration, 'seconds').format('hh:mm:ss', { trim: false });
  };
  const calcClickedTime = (e) => {
    const clickPositionInPage = e.pageX;
    const barStart = barRef.current.getBoundingClientRect().left + window.scrollX;
    const barWidth = barRef.current.offsetWidth;
    const clickPositionInBar = clickPositionInPage - barStart;
    const timePerPixel = duration / barWidth;
    return timePerPixel * clickPositionInBar;
  };
  const handleTimeDrag = (e) => {
    onTimeUpdate(calcClickedTime(e));
    if (!playing) {
      setAudioState('play');
    }
    const updateTimeOnMove = (eMove) => {
      onTimeUpdate(calcClickedTime(eMove));
    };

    document.addEventListener('mousemove', updateTimeOnMove);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', updateTimeOnMove);
    });
  };

  return (
    <div className={cx('wrapper', className)}>
      <div
        className={cx('progress')}
        ref={barRef}
        style={
          playing
            ? {
                background: `linear-gradient(to right, #7b51fb ${curPercentage}%, #403247 0)`,
              }
            : { background: `linear-gradient(to right, #7b51fb ${curPercentage}%, #edeced 0)` }
        }
        onMouseDown={(e) => handleTimeDrag(e)}
      >
        <span
          className={cx('knob', { showKnob: playing })}
          style={{ left: `${curPercentage - 2}%` }}
        />
      </div>
      <span className={cx('time', { audioPlay: playing })}>
        {formatDuration(currentTime)} / {formatDuration(duration)}
      </span>
    </div>
  );
};

Bar.propTypes = {
  className: PropTypes.string,
  duration: PropTypes.number,
  currentTime: PropTypes.number,
  onTimeUpdate: PropTypes.func.isRequired,
  playing: PropTypes.bool,
  setAudioState: PropTypes.func.isRequired,
};

Bar.defaultProps = {
  className: null,
  duration: 0,
  currentTime: 0,
  playing: false,
};

export default Bar;
