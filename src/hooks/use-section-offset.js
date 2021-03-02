import { useState, useLayoutEffect } from 'react';

import useWindowSize from 'hooks/use-window-size';

const useSectionOffset = (sectionRef, opts = {}) => {
  const [sectionStart, setSectionStart] = useState(null);
  const [sectionEnd, setSectionEnd] = useState(null);
  const [sectionHidden, setSectionHidden] = useState(null);
  const [scrollPercentageStart, setScrollPercentageStart] = useState(null);
  const [scrollPercentageEnd, setScrollPercentageEnd] = useState(null);

  const windowSize = useWindowSize();

  useLayoutEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const rect = sectionRef.current.getBoundingClientRect();

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // const screenHeight = document.documentElement.clientHeight;
    const offStartAppend =
      typeof opts.offsetStartAppend !== 'undefined' ? opts.offsetStartAppend : 0;

    // section appears in view
    const offsetStart = rect.top + scrollTop + offStartAppend;

    // full section in view
    const offsetEnd = offsetStart + rect.height;
    // section is out of view, above the viewport
    const offsetHidden = offsetEnd + rect.height;

    const sectionScrollStart = offsetStart / document.body.clientHeight;
    const sectionScrollEnd = offsetEnd / document.body.clientHeight;

    setSectionStart(offsetStart);
    setSectionEnd(offsetEnd);
    setSectionHidden(offsetHidden);
    setScrollPercentageStart(sectionScrollStart);
    setScrollPercentageEnd(sectionScrollEnd);
  }, [windowSize, sectionRef, opts]);

  return { sectionStart, sectionEnd, sectionHidden, scrollPercentageStart, scrollPercentageEnd };
};

export default useSectionOffset;
