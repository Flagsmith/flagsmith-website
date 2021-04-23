import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import Audio from 'components/shared/audio';
import Heading from 'components/shared/heading';
import Info from 'components/shared/info';

import Hero from '../hero';

import styles from './content.module.scss';

const cx = classNames.bind(styles);

const Content = (props) => {
  const {
    title,
    description,
    author: {
      node: { firstName, lastName },
    },
  } = props;
  const authorName = `${firstName} ${lastName}`;
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('label')}>
          <Heading className={cx('title')} size="xl">
            {title}
          </Heading>
          <p className={cx('description')}>{description}</p>
          <Info fullName={authorName} fullDate={authorName} title={title} pageUrl={pageUrl} />
        </div>
        <Hero
          authorName={authorName}
          guestName="Torkel Ödegaard"
          guestPosition="Creator & Project Lead"
          content="It's much more useful for Grafana to be more open, compostable, and use different data sources because that's the reality of so many users."
        />
        <Audio />
      </div>
    </div>
  );
};

Content.propTypes = {};

Content.defaultProps = {};

export default Content;
