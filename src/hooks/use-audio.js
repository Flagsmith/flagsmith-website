/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';

import { isSafari } from 'utils/check-browser';

const useAudio = () => {
  const [isAudioReady, setIsAudioReady] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioState, setAudioState] = useState('stop');
  const [clickedTime, setClickedTime] = useState();
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef();

  const setAudioTime = () => setCurrentTime(audioRef.current.currentTime);

  const muteAudio = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    const getAudioData = () => {
      setIsAudioReady(true);
      setDuration(audioRef.current.duration);
      setCurrentTime(audioRef.current.currentTime);
    };
    // Safari does not fire canplay video event
    // https://stackoverflow.com/questions/50051639/javascript-html5-video-event-canplay-not-firing-on-safari

    const canPlayEventName = isSafari ? 'loadedmetadata' : 'canplay';
    const allowedReadyState = isSafari ? 1 : 3;
    if (audioRef.current) {
      if (audioRef.current.readyState >= allowedReadyState) {
        getAudioData();
      }
      if (audioRef.current.readyState < allowedReadyState) {
        audioRef.current.addEventListener(canPlayEventName, getAudioData);
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener(canPlayEventName, getAudioData);
      }
    };
  }, [audioRef.current, currentTime, duration]);

  useEffect(() => {
    if (!isAudioReady) {
      return;
    }
    if (audioState === 'play') {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isAudioReady, audioState]);

  useEffect(() => {
    if (clickedTime && clickedTime !== currentTime) {
      audioRef.current.currentTime = clickedTime;
      setClickedTime(null);
    }
  }, [clickedTime, currentTime]);

  return {
    audioRef,
    duration,
    setAudioTime,
    currentTime,
    audioState,
    setAudioState,
    setClickedTime,
    muteAudio,
    isMuted,
    setIsMuted,
  };
};

export default useAudio;
