import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import Heading from 'components/shared/heading';
import Info from 'components/shared/info';
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
  const fullName = `${firstName} ${lastName}`;

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container', 'inner')}>
        <Heading className={cx('title')} size="xl">
          {title}
        </Heading>
        <Info fullName={fullName} fullDate={fullDate} title={title} pageUrl={pageUrl} />
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
  content: PropTypes.arrayOf(PropTypes.any).isRequired,
};
export default Content;
