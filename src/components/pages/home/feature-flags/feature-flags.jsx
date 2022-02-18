import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';
import { useInView } from 'react-intersection-observer';

import FeatureFlagsIllustration from 'components/shared/feature-flags-illustration';
import Heading from 'components/shared/heading/heading';
import Link from 'components/shared/link/link';

import styles from './feature-flags.module.scss';
import AbTestsIcon from './images/ab-tests.inline.svg';
import FlagIcon from './images/flag.inline.svg';
import Icon from './images/icon.inline.svg';
import ListIcon from './images/list.inline.svg';

const cx = classNames.bind(styles);

const icons = {
  flag: FlagIcon,
  list: ListIcon,
  abTests: AbTestsIcon,
};

const FeatureFlags = ({ title, description, link: { url }, features }) => {
  const [animationContainer, animationContainerView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <section className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('inner')}>
          <div className={cx('left')} ref={animationContainer}>
            <FeatureFlagsIllustration
              className={cx('illustration')}
              animate={animationContainerView}
            />
          </div>
          <div className={cx('right')}>
            <Icon className={cx('icon')} />
            <Heading className={cx('title')} tag="h2" size="xl">
              {title}
            </Heading>
            <div className={cx('description')} dangerouslySetInnerHTML={{ __html: description }} />
            <Link className={cx('link')} to={url} withArrow>
              Learn More
            </Link>
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

FeatureFlags.propTypes = {
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

FeatureFlags.defaultProps = {
  features: null,
};

export default FeatureFlags;
