import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import styles from './code.module.scss';

const cx = classNames.bind(styles);

const Code = ({ language, children }) => (
  <div className={cx('wrapper')}>
    <SyntaxHighlighter language={language} style={okaidia} useInlineStyles={false} showLineNumbers>
      {children}
    </SyntaxHighlighter>
  </div>
);

Code.propTypes = {
  language: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default Code;
