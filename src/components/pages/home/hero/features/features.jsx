import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import State from './state';

import styles from './features.module.scss';

import Logo from './images/logo.inline.svg';

import shape1 from './images/shape-1.url.svg';
import shape2 from './images/shape-2.url.svg';
import shapeAddition from './images/shape-addition.url.svg';
import shapeEqual from './images/shape-equal.url.svg';

const cx = classNames.bind(styles);

const Features = ({ code, options }) => {
  const [state, setState] = useState({
    chat: false,
    designV2: false,
    dark: false,
  });

  const handleSwitchButton = (key) => {
    setState((prevState) => ({ ...prevState, [key]: !prevState[key] }));
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('code')}>
        <div className={cx('code-panel')}>
          <span>flagsmith-import.js</span>
        </div>
        <SyntaxHighlighter
          language="javascript"
          showLineNumbers
          style={okaidia}
          useInlineStyles={false}
        >
          {code}
        </SyntaxHighlighter>
      </div>

      <div className={cx('options')}>
        <div className={cx('options-inner')}>
          <span className={cx('options-title')}>feautures</span>
          {options.map(({ label, key }) => (
            <div className={cx('options-item', key)} key={key}>
              {label}
              <button
                className={cx('switch-button', {
                  checked: state[key],
                })}
                onClick={() => handleSwitchButton(key)}
              />
            </div>
          ))}

          <div className={cx('options-footer')}>
            <Logo />
          </div>
        </div>

        <img
          className={cx('shape', 'shape-addition')}
          src={shapeAddition}
          alt=""
          loading="lazy"
          aria-hidden
        />
        <img
          className={cx('shape', 'shape-equal')}
          src={shapeEqual}
          alt=""
          loading="lazy"
          aria-hidden
        />
      </div>

      <div className={cx('state')}>
        <State {...state} setOption={handleSwitchButton} />
      </div>

      <img className={cx('shape', 'shape-1')} src={shape1} alt="" loading="lazy" aria-hidden />
      <img className={cx('shape', 'shape-2')} src={shape2} alt="" loading="lazy" aria-hidden />
    </div>
  );
};

Features.propTypes = {
  code: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    })
  ).isRequired,
};

Features.defaultProps = {
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
  options: [
    {
      label: 'Design 2.0',
      key: 'designV2',
    },
    {
      label: 'Chat',
      key: 'chat',
    },
    {
      label: 'Dark mode',
      key: 'dark',
    },
  ],
};

export default Features;
