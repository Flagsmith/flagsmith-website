import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import styles from './code.module.scss';

const cx = classNames.bind(styles);

const Code = ({ codeLabel, code }) => (
  <div className={cx('wrapper')}>
    <div className={cx('panel')}>
      <span>{codeLabel}</span>
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
);

Code.propTypes = {
  codeLabel: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
};

export default Code;
