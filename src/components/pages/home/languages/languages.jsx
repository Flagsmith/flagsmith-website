import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useViewportScroll, motion, useTransform } from 'framer-motion';

import Heading from 'components/shared/heading/heading';
import Link from 'components/shared/link/link';
import useSectionOffset from 'hooks/use-section-offset';

import styles from './languages.module.scss';
import Logo from 'images/logo.inline.svg';
import IconArrowRight from 'icons/arrow-right.inline.svg';

import shapeAndroid from './images/android.url.svg';
import shapePython from './images/python.url.svg';
import shapePhp from './images/php.url.svg';
import shapeRuby from './images/ruby.url.svg';
import shapeReactNative from './images/react-native.url.svg';
import shapeIos from './images/ios.url.svg';
import shapeFlutter from './images/flutter.url.svg';
import shapeJavascript from './images/javascript.url.svg';

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
    image: shapeAndroid,
  },
  {
    name: 'python',
    image: shapePython,
  },
  {
    name: 'php',
    image: shapePhp,
  },
  {
    name: 'ruby',
    image: shapeRuby,
  },
  {
    name: 'react-native',
    image: shapeReactNative,
  },
  {
    name: 'ios',
    image: shapeIos,
  },
  {
    name: 'flutter',
    image: shapeFlutter,
  },
  {
    name: 'javascript',
    image: shapeJavascript,
  },
];

const Languages = ({ title, description, buttonText, buttonLink, tabs }) => {
  const sectionRef = useRef();
  const { scrollYProgress } = useViewportScroll();
  const { scrollPercentageStart, scrollPercentageEnd } = useSectionOffset(sectionRef);

  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const inputRange = variantsIntervals.map(
    (input) => scrollPercentageStart + (scrollPercentageEnd - scrollPercentageStart) * input
  );

  const getParallaxStyle = (index) => {
    const marginTop = useTransform(scrollYProgress, inputRange, variantsParallax[index]);

    return {
      marginTop,
    };
  };

  return (
    <section className={cx('wrapper')} ref={sectionRef}>
      <div className="container">
        <div className={cx('head')}>
          <Heading className={cx('title')} tag="h2" size="xl">
            {title}
          </Heading>
          <p className={cx('description')}>{description}</p>
          <Link className={cx('link', 'icon-arrow')} to={buttonLink}>
            {buttonText} <IconArrowRight />
          </Link>
        </div>
        <div className={cx('tabs-wrapper')}>
          <div className={cx('tabs')}>
            <ul className={cx('tabs-list')}>
              {tabs.map(({ language }, index) => (
                <li
                  className={cx('tabs-item', { active: index === activeItemIndex })}
                  key={index}
                  onClick={() => setActiveItemIndex(index)}
                >
                  {language}
                </li>
              ))}
            </ul>
          </div>

          <div className={cx('tabs-content')}>
            {tabs.map(({ codeStyle, code }, index) => (
              <SyntaxHighlighter
                className={cx('tabs-content-item', { active: index === activeItemIndex })}
                language={codeStyle}
                showLineNumbers
                style={okaidia}
                useInlineStyles={false}
                key={index}
              >
                {code}
              </SyntaxHighlighter>
            ))}
            <Logo className={cx('tabs-content-logo')} />
          </div>
        </div>
      </div>

      {imageCollection.map(({ name, image }, index) => (
        <motion.img
          className={cx('shape', `shape-${name}`)}
          src={image}
          alt=""
          loading="lazy"
          aria-hidden
          style={getParallaxStyle(index)}
          key={index}
        />
      ))}
    </section>
  );
};

Languages.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      language: PropTypes.string.isRequired,
      codeStyle: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
    })
  ).isRequired,
};

Languages.defaultProps = {
  title: 'Available for these languages',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis massa sollicitudin pellentesque sit praesent ac amet vitae.',
  buttonText: 'Learn More',
  buttonLink: '/',
  tabs: [
    {
      language: 'Rest',
      codeStyle: 'javascript',
      code: `import flagsmith from 'flagsmith';

flagsmith.init({
  environmentID: 'QjgYur4LQTwe5HpvbvhpzK',
});

function Main(props) {
  if (flagsmith
  .hasFeature("chat_widget")){
    return <ChatWidget/>;
  }
}
 
 
 
 
 
 
 
      `,
    },
    {
      language: 'React Native',
      codeStyle: 'javascript',
      code: `import React from 'react';
import { Text, View } from 'react-native';

const HelloWorldApp = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Text>Hello, world!</Text>
    </View>
  )
}
export default HelloWorldApp;
      `,
    },
    {
      language: 'Node',
      codeStyle: 'javascript',
      code: `import flagsmith from 'flagsmith';

flagsmith.init({
  environmentID: 'QjgYur4LQTwe5HpvbvhpzK',
});

function Main(props) {
  if (flagsmith
  .hasFeature("chat_widget")){
    return <ChatWidget/>;
  }
}
      `,
    },
    {
      language: 'Android',
      codeStyle: 'kotlin',
      code: `import flagsmith from 'flagsmith';

flagsmith.init({
  environmentID: 'QjgYur4LQTwe5HpvbvhpzK',
});

function Main(props) {
  if (flagsmith
  .hasFeature("chat_widget")){
    return <ChatWidget/>;
  }
}
      `,
    },
    {
      language: 'IOS',
      codeStyle: 'swift',
      code: `import flagsmith from 'flagsmith';

flagsmith.init({
  environmentID: 'QjgYur4LQTwe5HpvbvhpzK',
});

function Main(props) {
  if (flagsmith
  .hasFeature("chat_widget")){
    return <ChatWidget/>;
  }
}
      `,
    },
    {
      language: 'Flutter',
      codeStyle: 'javascript',
      code: `import flagsmith from 'flagsmith';

flagsmith.init({
  environmentID: 'QjgYur4LQTwe5HpvbvhpzK',
});

function Main(props) {
  if (flagsmith
  .hasFeature("chat_widget")){
    return <ChatWidget/>;
  }
}
      `,
    },
    {
      language: 'Java',
      codeStyle: 'java',
      code: `import flagsmith from 'flagsmith';

flagsmith.init({
  environmentID: 'QjgYur4LQTwe5HpvbvhpzK',
});

function Main(props) {
  if (flagsmith
  .hasFeature("chat_widget")){
    return <ChatWidget/>;
  }
}
      `,
    },
    {
      language: 'Python',
      codeStyle: 'python',
      code: `import flagsmith from 'flagsmith';

flagsmith.init({
  environmentID: 'QjgYur4LQTwe5HpvbvhpzK',
});

function Main(props) {
  if (flagsmith
  .hasFeature("chat_widget")){
    return <ChatWidget/>;
  }
}
      `,
    },
    {
      language: 'Ruby',
      codeStyle: 'ruby',
      code: `import flagsmith from 'flagsmith';

flagsmith.init({
  environmentID: 'QjgYur4LQTwe5HpvbvhpzK',
});

function Main(props) {
  if (flagsmith
  .hasFeature("chat_widget")){
    return <ChatWidget/>;
  }
}
      `,
    },
    {
      language: '.NET',
      codeStyle: 'javascript',
      code: `import flagsmith from 'flagsmith';

flagsmith.init({
  environmentID: 'QjgYur4LQTwe5HpvbvhpzK',
});

function Main(props) {
  if (flagsmith
  .hasFeature("chat_widget")){
    return <ChatWidget/>;
  }
}
      `,
    },
    {
      language: 'GO',
      codeStyle: 'go',
      code: `import flagsmith from 'flagsmith';

flagsmith.init({
  environmentID: 'QjgYur4LQTwe5HpvbvhpzK',
});

function Main(props) {
  if (flagsmith
  .hasFeature("chat_widget")){
    return <ChatWidget/>;
  }
}
      `,
    },
    {
      language: 'Rust',
      codeStyle: 'rust',
      code: `import flagsmith from 'flagsmith';

flagsmith.init({
  environmentID: 'QjgYur4LQTwe5HpvbvhpzK',
});

function Main(props) {
  if (flagsmith
  .hasFeature("chat_widget")){
    return <ChatWidget/>;
  }
}
      `,
    },
    {
      language: 'PHP',
      codeStyle: 'php',
      code: `import flagsmith from 'flagsmith';

flagsmith.init({
  environmentID: 'QjgYur4LQTwe5HpvbvhpzK',
});

function Main(props) {
  if (flagsmith
  .hasFeature("chat_widget")){
    return <ChatWidget/>;
  }
}
      `,
    },
  ],
};

export default Languages;
