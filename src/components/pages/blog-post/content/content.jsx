import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';

import Heading from 'components/shared/heading';
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
  content,
}) => {
  const fullDate = getLocaleDate(date);
  const pageUrl = `${process.env.GATSBY_DEFAULT_SITE_URL}${url}`;

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
        <div className={cx('content')}>{content}</div>
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
  content: PropTypes.string.isRequired,
};
export default Content;
