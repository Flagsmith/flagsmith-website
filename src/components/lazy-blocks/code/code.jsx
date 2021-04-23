import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import Button from 'components/shared/button';
import useCopyToClipboard from 'hooks/use-copy-to-clipboard';

import styles from './code.module.scss';

const cx = classNames.bind(styles);

const Code = ({ language, children }) => {
  const { isCopied, handleCopy } = useCopyToClipboard(3000);

  return (
    <div className={cx('wrapper')}>
      <SyntaxHighlighter
        language={language}
        style={okaidia}
        useInlineStyles={false}
        showLineNumbers
      >
        {children}
      </SyntaxHighlighter>
      <div className={cx('button-wrapper')}>
        {isCopied ? (
          <Button theme="accent-secondary" size="md" className={cx('button')} disabled>
            Copied
          </Button>
        ) : (
          <Button
            className={cx('button')}
            theme="accent-secondary"
            size="md"
            type="button"
            onClick={() => handleCopy(children)}
          >
            Copy
          </Button>
        )}
      </div>
    </div>
  );
};
Code.propTypes = {
  language: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default Code;
