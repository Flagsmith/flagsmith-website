import classNames from 'classnames/bind';
import { useViewportScroll, motion, transform } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import Heading from 'components/shared/heading/heading';
import Link from 'components/shared/link/link';
import useSectionOffset from 'hooks/use-section-offset';
import Logo from 'images/logo.inline.svg';

import ShapeAndroid from './images/android.inline.svg';
import ArrowLeft from './images/arrow-left.inline.svg';
import ArrowRight from './images/arrow-right.inline.svg';
import ShapeFlutter from './images/flutter.inline.svg';
import ShapeIos from './images/ios.inline.svg';
import ShapeJavascript from './images/javascript.inline.svg';
import ShapePhp from './images/php.inline.svg';
import ShapePython from './images/python.inline.svg';
import ShapeReactNative from './images/react-native.inline.svg';
import ShapeRuby from './images/ruby.inline.svg';
import styles from './languages.module.scss';

const cx = classNames.bind(styles);

const variantsParallax = [
  [-60, -40, 20, 40, 80],
  [-20, -10, 0, 10, 20],
  [-20, -10, 0, 10, 20],
  [-60, -40, 20, 40, 80],
  [-60, -40, 20, 40, 80],
  [-20, -10, 0, 10, 20],
  [-20, -10, 0, 10, 20],
  [-10, -5, 0, 5, 10],
];
const variantsIntervals = [0, 0.2, 0.4, 0.8, 1];

const imageCollection = [
  {
    name: 'android',
    Icon: ShapeAndroid,
  },
  {
    name: 'python',
    Icon: ShapePython,
  },
  {
    name: 'php',
    Icon: ShapePhp,
  },
  {
    name: 'ruby',
    Icon: ShapeRuby,
  },
  {
    name: 'react-native',
    Icon: ShapeReactNative,
  },
  {
    name: 'ios',
    Icon: ShapeIos,
  },
  {
    name: 'flutter',
    Icon: ShapeFlutter,
  },
  {
    name: 'javascript',
    Icon: ShapeJavascript,
  },
];

const Languages = ({
  title,
  description,
  buttonText,
  link: { url },
  items,
  initiallySelectedItemNumber,
}) => {
  const sectionRef = useRef();

  const { scrollYProgress } = useViewportScroll();
  const { scrollPercentageStart, scrollPercentageEnd } = useSectionOffset(sectionRef);

  // We subtract from initiallySelectedItemNumber because arrays are starting from 0
  const [activeItemIndex, setActiveItemIndex] = useState(initiallySelectedItemNumber - 1 || 0);

  const inputRange = variantsIntervals.map(
    (input) => scrollPercentageStart + (scrollPercentageEnd - scrollPercentageStart) * input
  );

  const handleButtonLeft = () => {
    const activeIndex = activeItemIndex === 0 ? items.length - 1 : activeItemIndex - 1;
    setActiveItemIndex(activeIndex);
  };

  const handleButtonRight = () => {
    const activeIndex = activeItemIndex < items.length - 1 ? activeItemIndex + 1 : 0;
    setActiveItemIndex(activeIndex);
  };

  const getParallaxStyle = (index) => {
    const marginTop = transform(scrollYProgress, inputRange, variantsParallax[index]);

    return {
      marginTop,
    };
  };

  return (
    <section className={cx('wrapper')} ref={sectionRef}>
      <div className={cx('container', 'inner')}>
        <div className={cx('head')}>
          <Heading className={cx('title')} tag="h2" size="xl">
            {title}
          </Heading>
          <p className={cx('description')}>{description}</p>
          <Link className={cx('link')} to={url} withArrow>
            {buttonText}
          </Link>
        </div>
        <div className={cx('tabs-wrapper')}>
          <div className={cx('tabs')}>
            <ul className={cx('tabs-list')}>
              <button className={cx('tabs-button')} theme="tertiary" onClick={handleButtonLeft}>
                <ArrowLeft />
              </button>
              {items.map(({ language }, index) => (
                <li
                  className={cx('tabs-item', { active: index === activeItemIndex })}
                  key={index}
                  onClick={() => setActiveItemIndex(index)}
                >
                  {language}
                </li>
              ))}
              <button className={cx('tabs-button')} theme="tertiary" onClick={handleButtonRight}>
                <ArrowRight />
              </button>
            </ul>
          </div>

          <div className={cx('tabs-content')}>
            <div className={cx('tabs-content-inner')}>
              {items.map(({ codeStyle, code }, index) => (
                <SyntaxHighlighter
                  className={cx('tabs-content-item', { active: index === activeItemIndex })}
                  language={codeStyle}
                  style={okaidia}
                  useInlineStyles={false}
                  key={index}
                  showLineNumbers
                >
                  {code}
                </SyntaxHighlighter>
              ))}
            </div>
            <Logo className={cx('tabs-content-logo')} />
          </div>
        </div>
      </div>

      <div>
        {imageCollection.map(({ name, Icon }, index) => (
          <motion.div
            className={cx('shape', `shape-${name}`)}
            style={getParallaxStyle(index)}
            key={index}
            aria-hidden
          >
            <Icon />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

Languages.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  link: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      language: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
      codeStyle: PropTypes.string.isRequired,
    })
  ).isRequired,
  initiallySelectedItemNumber: PropTypes.number,
};

Languages.defaultProps = {
  buttonText: 'Learn More',
  initiallySelectedItemNumber: 0,
};

export default Languages;
