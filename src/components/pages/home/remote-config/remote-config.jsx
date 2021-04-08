import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';
import { useInView } from 'react-intersection-observer';

import Heading from 'components/shared/heading/heading';
import Link from 'components/shared/link/link';
import RemoteConfigIllustration from 'components/shared/remote-config-illustration';

import Icon from './images/icon.inline.svg';
import styles from './remote-config.module.scss';

const cx = classNames.bind(styles);

const RemoteConfig = ({ title, description, link: { url } }) => {
  const [animationContainer, animationContainerView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });
  return (
    <section className={cx('wrapper')}>
      <div className={cx('container', 'inner')}>
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
};

export default RemoteConfig;
