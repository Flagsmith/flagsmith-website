import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import Audio from 'components/shared/audio';
import Heading from 'components/shared/heading';
import Info from 'components/shared/info';
import getLocaleDate from 'utils/get-locale-date';

import About from '../about';
import Hero from '../hero';
import RelativeLinks from '../relative-links';

import styles from './content.module.scss';

const cx = classNames.bind(styles);

function replaceAnd(string) {
  return string.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace('-', '').replace('_', '')
  );
}

const Content = (props) => {
  const {
    podcastUrl,
    title,
    logo,
    content,
    guest,
    host,
    quote,
    relatedLinks,
    date,
    url,
    author: {
      node: { firstName, lastName },
    },
  } = props;
  const authorName = `${firstName} ${lastName}`;
  const pageUrl = `${process.env.GATSBY_DEFAULT_SITE_URL}${url}`;
  const fullDate = getLocaleDate(date);
  const updatedPosition = guest.position.replace(/&/g, 'and');
  const description = `Interview with ${guest.fullName}: ${updatedPosition}, ${title}`;
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container-sm')}>
        <div className={cx('label')}>
          <Heading className={cx('title')} size="xl">
            {title}
          </Heading>
          <p className={cx('description')}>{description}</p>
          <Info fullName={authorName} fullDate={fullDate} title={title} pageUrl={pageUrl} />
        </div>
        <Hero guest={guest} host={host} quote={quote} logo={logo} />
        <Audio audioUrl={podcastUrl} />

        <div className={cx('content')}>{content}</div>
        <About {...guest} />
        <RelativeLinks title="Links from the Episode" items={relatedLinks} />
      </div>
    </div>
  );
};

Content.propTypes = {};

Content.defaultProps = {
  description: 'Interview with Torkel Ödegaard: Creator and Project Lead, Grafana Labs',
};

export default Content;
