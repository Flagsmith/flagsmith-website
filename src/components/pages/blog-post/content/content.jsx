import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';

import Heading from 'components/shared/heading';
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
}) => {
  const { content } = useContext(MainContext);
  const fullDate = getLocaleDate(date);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container', 'inner')}>
        <Heading className={cx('title')} size="xl">
          {title}
        </Heading>
        <span className={cx('info')}>
          By {firstName} {lastName} on {fullDate}
        </span>
        <div className={cx('content')} dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

Content.propTypes = {};

Content.defaultProps = {};

export default Content;
