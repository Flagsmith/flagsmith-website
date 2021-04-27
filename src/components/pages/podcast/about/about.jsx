import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import Heading from 'components/shared/heading';

import Avatar from '../avatar';

import styles from './about.module.scss';

const cx = classNames.bind(styles);

const About = ({ fullName, photo, description, additionalInformation }) => (
  <section className={cx('wrapper')}>
    <div className={cx('inner')}>
      <Heading tag="h4" size="md">
        About {fullName}
      </Heading>
      <p className={cx('about')}>{description}</p>
      {additionalInformation && (
        <div
          className={cx('additional')}
          dangerouslySetInnerHTML={{ __html: additionalInformation }}
        />
      )}
      <Avatar additionalClassName={cx('photo')} photo={photo} />
    </div>
  </section>
);

About.propTypes = {};

About.defaultProps = {};

export default About;
