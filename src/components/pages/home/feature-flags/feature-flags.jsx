import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Heading from 'components/shared/heading/heading';
import Link from 'components/shared/link/link';
import styles from './feature-flags.module.scss';

import Icon from './images/icon.inline.svg';
import illustration from './images/illustration.url.svg';
import IconArrowRight from 'icons/arrow-right.inline.svg';

const cx = classNames.bind(styles);

const FeatureFlags = ({ title, description }) => (
  <section className={cx('wrapper')}>
    <div className={cx('container', 'inner')}>
      <div className={cx('left')}>
        <img className={cx('illustration')} src={illustration} alt="" loading="lazy" />
      </div>
      <div className={cx('right')}>
        <Icon className={cx('icon')} />
        <Heading className={cx('title')} tag="h2" size="xl">
          {title}
        </Heading>
        <div className={cx('description')} dangerouslySetInnerHTML={{ __html: description }} />
        <Link className={cx('link', 'icon-arrow')} to="/">
          Learn More <IconArrowRight />
        </Link>
      </div>
    </div>
  </section>
);

FeatureFlags.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

FeatureFlags.defaultProps = {
  title: 'Feature flags',
  description: `<ul>
    <li>Flagsmith makes it easy to create and manage features flags across web, mobile, and server-side applications.</li>
    <li>Just wrap a section of code with a flag, and then use Flagsmith to toggle that feature on or off for different environments, users or user segments.</li>
  </ul>`,
};

export default FeatureFlags;
