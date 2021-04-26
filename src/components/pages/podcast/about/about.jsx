import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import Heading from 'components/shared/heading';

import Avatar from '../avatar';

import styles from './about.module.scss';

const cx = classNames.bind(styles);

const About = ({ guestName, photo, about, availableOn }) => (
  <section className={cx('wrapper')}>
    <div className={cx('inner')}>
      <Heading tag="h4" size="md">
        About {guestName}
      </Heading>
      <p className={cx('about')}>{about}</p>
      <p>Available for talk, coaching and workshops on:</p>
      <ul>
        {availableOn.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <Avatar additionalClassName={cx('photo')} />
    </div>
  </section>
);

About.propTypes = {};

About.defaultProps = {};

export default About;
