import { useState, useEffect, useRef } from 'react';
import { RHAP_UI } from 'react-h5-audio-player';

const useAudio = (audioUrl, isCurrentPodcast, setCurrentPodcast, setIsCurrentPodcastPlaying) => {
  const audioRef = useRef();
  const audio = audioRef.current?.audio.current;

  const [isPlaying, setIsPlaying] = useState(false);

  // More details:
  // https://static.hanzluo.com/react-h5-audio-player-storybook/index.html?path=/docs/layouts-advanced--stacked
  const [controlsSection, setControlsSection] = useState([RHAP_UI.MAIN_CONTROLS]);
  const [progressBarSection, setProgressBarSection] = useState([
    RHAP_UI.PROGRESS_BAR,
    RHAP_UI.CURRENT_TIME,
    RHAP_UI.DURATION,
    RHAP_UI.VOLUME_CONTROLS,
  ]);

  const handlePlaying = () => setIsPlaying(!isPlaying);

  const setCustomControls = () => {
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
      setCustomControls();

      window.addEventListener('resize', setCustomControls);

      return () => {
        window.removeEventListener('resize', setCustomControls);
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
    if (typeof isCurrentPodcast === 'undefined' || !audio) {
      return;
    }
    // pause and play when switching between podcasts
    if (isCurrentPodcast) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isCurrentPodcast, audio]);

  return {
    audioRef,
    isPlaying,
    handlePlaying,
    controlsSection,
    progressBarSection,
  };
};

export default useAudio;
