import React from 'react';

import classNames from 'classnames/bind';
import styles from './configure-features.module.scss';
import Heading from 'components/shared/heading/heading';

import illustration from './images/illustration.url.svg';

const cx = classNames.bind(styles);

const ConfigureFeatures = (props) => (
  <section className={cx('wrapper')}>
    <div className="container">
      <Heading className={cx('title')} tag="h2" size="xl" highlightedWordsWithoutWrap={false}>
        You can configure features for <span>Individual segments</span>,{' '}
        <span className={cx('title-color-accent-tertiary')}>Users</span>, and{' '}
        <span className={cx('title-color-accent-secondary')}>Development environments</span>.
      </Heading>
    </div>

    <img className={cx('illustration')} src={illustration} alt="" loading="lazy" aria-hidden />
  </section>
);

export default ConfigureFeatures;
