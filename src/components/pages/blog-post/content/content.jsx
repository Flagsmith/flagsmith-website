import classNames from 'classnames/bind';
import parse, { attributesToProps } from 'html-react-parser';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import Heading from 'components/shared/heading';
import Info from 'components/shared/info';
import MainContext from 'context/main';
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
  const fullName = `${firstName} ${lastName}`;

  let reactedContent;
  if (content) {
    reactedContent = parse(content, {
      replace: (domNode) => {
        const props = attributesToProps(domNode.attribs);
        if (domNode.type === 'tag' && domNode.name === 'codeblock') {
          return (
            <div className={cx('code-wrapper')}>
              <SyntaxHighlighter
                language={props.language}
                style={okaidia}
                useInlineStyles={false}
                showLineNumbers
              >
                {props.code}
              </SyntaxHighlighter>
            </div>
          );
        }
        return undefined;
      },
    });
  }
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container', 'inner')}>
        <Heading className={cx('title')} size="xl">
          {title}
        </Heading>
        <Info fullName={fullName} fullDate={fullDate} title={title} pageUrl={pageUrl} />
        <div className={cx('content')}>{reactedContent}</div>
      </div>
    </div>
  );
};

Content.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.shape({
    node: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
  }).isRequired,
  date: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
export default Content;
