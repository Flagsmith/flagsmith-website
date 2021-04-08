import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';
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
      style={okaidia}
      useInlineStyles={false}
      showLineNumbers
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
