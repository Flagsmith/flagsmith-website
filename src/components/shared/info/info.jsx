import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';

import FacebookIcon from 'icons/facebook.inline.svg';
import LinkedinIcon from 'icons/linkedin.inline.svg';
import TwitterIcon from 'icons/twitter.inline.svg';

import styles from './info.module.scss';

const cx = classNames.bind(styles);

const Info = ({ fullName, fullDate, title, pageUrl }) => (
  <div className={cx('wrapper')}>
    <span className={cx('info')}>
      By {fullName} on {fullDate}
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
);

Info.propTypes = {
  fullName: PropTypes.string.isRequired,
  fullDate: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  pageUrl: PropTypes.string.isRequired,
};

export default Info;
