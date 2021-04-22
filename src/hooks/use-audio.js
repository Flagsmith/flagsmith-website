import { useState, useEffect } from 'react';

const useAudio = (audioUrl) => {
  const [audioEl, setAudioEl] = useState(null);
  const [duration, setDuration] = useState();
  const [currentTime, setCurrentTime] = useState();
  const [playing, setPlaying] = useState(false);
  const [clickedTime, setClickedTime] = useState();
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setAudioEl(new Audio(audioUrl));
  }, [audioUrl]);

  useEffect(() => {
    if (!audioEl) {
      return;
    }
    const getAudioData = (e) => {
      const { duration } = e.target;
      setDuration(duration);
      setCurrentTime(audioEl.currentTime);
    };
    const setAudioTime = () => setCurrentTime(audioEl.currentTime);

    audioEl.addEventListener('loadedmetadata', getAudioData);
    audioEl.addEventListener('timeupdate', setAudioTime);

    if (playing) {
      audioEl.play();
    } else {
      audioEl.pause();
    }

    if (isMuted) {
      audioEl.muted = true;
    } else {
      audioEl.muted = false;
    }

    if (clickedTime && clickedTime !== currentTime) {
      audioEl.currentTime = clickedTime;
      setClickedTime(null);
    }

    return () => {
      audioEl.removeEventListener('loadedmetadata', getAudioData);
      audioEl.removeEventListener('timeupdate', setAudioTime);
    };
  }, [audioEl, clickedTime, currentTime, isMuted, playing]);
  return { duration, currentTime, playing, setPlaying, setClickedTime, isMuted, setIsMuted };
};

export default useAudio;
