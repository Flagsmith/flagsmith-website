import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';
import { useInView } from 'react-intersection-observer';

import Heading from 'components/shared/heading/heading';
import Link from 'components/shared/link/link';
import RemoteConfigIllustration from 'components/shared/remote-config-illustration';

import CheckMarkIcon from './images/check-mark.inline.svg';
import Icon from './images/icon.inline.svg';
import RangeIcon from './images/range.inline.svg';
import SegmentsIcon from './images/segments.inline.svg';
import styles from './remote-config.module.scss';

const cx = classNames.bind(styles);

const icons = {
  checkMark: CheckMarkIcon,
  range: RangeIcon,
  segments: SegmentsIcon,
};

const RemoteConfig = ({ title, description, link: { url }, features }) => {
  const [animationContainer, animationContainerView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });
  return (
    <section className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('inner')}>
          <div className={cx('left')}>
            <Icon className={cx('icon')} />
            <Heading className={cx('title')} tag="h2" size="xl">
              {title}
            </Heading>
            <div className={cx('description')} dangerouslySetInnerHTML={{ __html: description }} />
            <Link className={cx('link')} to={url} withArrow>
              Learn More
            </Link>
          </div>
          <div className={cx('right')} ref={animationContainer}>
            <RemoteConfigIllustration
              className={cx('illustration')}
              animate={animationContainerView}
            />
          </div>

          {!!features?.length && (
            <div className={cx('features')}>
              {features.map(({ iconName, title, description }, index) => {
                const Icon = icons[iconName];
                return (
                  <div key={index}>
                    <Icon className={cx('feature-icon')} aria-hidden />
                    <h3 className={cx('feature-title')}>{title}</h3>
                    <p className={cx('feature-description')}>{description}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

RemoteConfig.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  features: PropTypes.arrayOf(
    PropTypes.shape({
      iconName: PropTypes.oneOf(Object.keys(icons)).isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ),
};

RemoteConfig.defaultProps = {
  features: null,
};

export default RemoteConfig;
