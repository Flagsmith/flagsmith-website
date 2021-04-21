import { useState, useEffect } from 'react';

const useAudio = (audio) => {
  const [audioDuration, setAudioDuration] = useState('');

  const getAudioDuration = (e) => {
    const { duration } = e.target;
    const timeDuration = `${Math.floor(duration / 60)}:${(duration % 60).toFixed()}`;
    setAudioDuration(timeDuration);
  };
  useEffect(() => {
    audio.addEventListener('loadedmetadata', getAudioDuration);
    return () => audio.removeEventListener('loadedmetadata', getAudioDuration);
  });
  return { audioDuration };
};

export default useAudio;
