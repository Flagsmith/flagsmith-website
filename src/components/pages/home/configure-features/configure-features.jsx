import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './configure-features.module.scss';
import Heading from 'components/shared/heading/heading';

import illustration from './images/illustration.url.svg';

const cx = classNames.bind(styles);

const ConfigureFeatures = ({ title }) => (
  <section className={cx('wrapper')}>
    <div className="container">
      <Heading
        className={cx('title')}
        tag="h2"
        size="xl"
        highlightedWordsWithoutWrap={false}
        innerHTML={title}
      />
    </div>

    <img className={cx('illustration')} src={illustration} alt="" loading="lazy" aria-hidden />
  </section>
);

ConfigureFeatures.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ConfigureFeatures;
