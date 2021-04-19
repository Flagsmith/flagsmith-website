import classNames from 'classnames/bind';
import parse, { attributesToProps } from 'html-react-parser';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import Heading from 'components/shared/heading';
import MainContext from 'context/main';
import FacebookIcon from 'icons/facebook.inline.svg';
import LinkedinIcon from 'icons/linkedin.inline.svg';
import TwitterIcon from 'icons/twitter.inline.svg';
import getLocaleDate from 'utils/get-locale-date';

import styles from './content.module.scss';

const cx = classNames.bind(styles);

const Content = ({
  title,
  author: {
    node: { firstName, lastName },
  },
  date,
  url,
}) => {
  const { content } = useContext(MainContext);
  const fullDate = getLocaleDate(date);
  const pageUrl = `${process.env.GATSBY_DEFAULT_SITE_URL}${url}`;

  const reactedContent = parse(content, {
    htmlparser2: {
      lowerCaseAttributeNames: true,
    },
    replace: (domNode) => {
      // if (domNode.type === 'tag' && domNode.attribs.class === 'code-content') {
      //   console.log(domNode);
      // }
      if (domNode.type === 'tag' && domNode.name === 'pre' && domNode.children[0].name === 'code') {
        console.log(domNode);
        return (
          <div className={cx('code-wrapper')}>
            <SyntaxHighlighter
              language="php"
              style={okaidia}
              useInlineStyles={false}
              showLineNumbers
            >
              {domNode.children[0].children[0].data}
            </SyntaxHighlighter>
          </div>
        );
      }
    },
  });
  // console.log(content);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container', 'inner')}>
        <Heading className={cx('title')} size="xl">
          {title}
        </Heading>
        <div className={cx('info-wrapper')}>
          <span className={cx('info')}>
            By {firstName} {lastName} on {fullDate}
          </span>
          <div className={cx('social-icons')}>
            <FacebookShareButton url={pageUrl}>
              <FacebookIcon />
            </FacebookShareButton>
            <TwitterShareButton title={title} url={pageUrl}>
              <TwitterIcon />
            </TwitterShareButton>
            <LinkedinShareButton title={title} url={pageUrl}>
              <LinkedinIcon />
            </LinkedinShareButton>
          </div>
        </div>
        <div className={cx('content')}>{reactedContent}</div>
      </div>
    </div>
  );
};

export default Content;
