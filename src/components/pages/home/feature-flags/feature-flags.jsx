import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';
import { useInView } from 'react-intersection-observer';

import FeatureFlagsIllustration from 'components/shared/feature-flags-illustration';
import Heading from 'components/shared/heading/heading';
import Link from 'components/shared/link/link';

import styles from './feature-flags.module.scss';
import Icon from './images/icon.inline.svg';

const cx = classNames.bind(styles);

const FeatureFlags = ({ title, description, link: { url } }) => {
  const [animationContainer, animationContainerView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <section className={cx('wrapper')}>
      <div className={cx('container', 'inner')}>
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
};

export default FeatureFlags;
