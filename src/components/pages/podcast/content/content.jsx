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

const Content = (props) => {
  const {
    title,
    description,
    podcastUrl,
    // author: {
    //   node: { firstName, lastName },
    // },
    content,
    guestName,
    aboutGuest,
    availableOn,
    relativeLinks,
    date,
    url,
  } = props;
  // const authorName = `${firstName} ${lastName}`;
  const authorName = `Jasurbek Normurodov`;
  const pageUrl = `${process.env.GATSBY_DEFAULT_SITE_URL}${url}`;
  const fullDate = getLocaleDate(date);
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
        <Hero
          authorName={authorName}
          guestName={guestName}
          guestPosition="Creator & Project Lead"
          quote="It's much more useful for Grafana to be more open, compostable, and use different data sources because that's the reality of so many users."
        />

        <div className={cx('content')}>{content}</div>
        <About guestName={guestName} about={aboutGuest} availableOn={availableOn} />
        <RelativeLinks items={relativeLinks} title="Links from the Episode" />
      </div>
    </div>
  );
};

Content.propTypes = {};

Content.defaultProps = {
  title: 'The Craft of Open Source.',
  description: 'Interview with Torkel Ödegaard: Creator and Project Lead, Grafana Labs',
  guestName: 'Torkel Ödegaard',
  aboutGuest: `Currently an open source entrepreneur, 
  working full time on development of the popular Grafana open source metrics and analytics platform. 
  Leading the development of the project and a core team of 20+ people. 
  Using technologies like Go, React, AngularJS, Graphite, Docker & Kubernetes. `,
  availableOn: [
    'Grafana and live & trend monitoring',
    'Continuous integration & Automated deployment',
    'Time series databases',
    'Application metrics & instrumentation',
  ],
  relativeLinks: [
    { url: '/', text: 'Grafana' },
    { url: '/', text: 'Loki' },
    { url: '/', text: 'Graphite' },
    { url: '/', text: 'Tempo' },
    { url: '/', text: 'Etsy' },
    { url: '/', text: 'Github (Grafana)' },
    { url: '/', text: 'Slack (Grafana)' },
  ],
};

export default Content;
