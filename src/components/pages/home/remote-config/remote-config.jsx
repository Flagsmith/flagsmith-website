import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Heading from 'components/shared/heading/heading';
import Link from 'components/shared/link/link';
import styles from './remote-config.module.scss';

import Icon from './images/icon.inline.svg';
import illustration from './images/illustration.url.svg';
import IconArrowRight from 'icons/arrow-right.inline.svg';

const cx = classNames.bind(styles);

const RemoteConfig = ({ title, description }) => (
  <section className={cx('wrapper')}>
    <div className={cx('container', 'inner')}>
      <div className={cx('left')}>
        <Icon className={cx('icon')} />
        <Heading className={cx('title')} tag="h2" size="xl">
          {title}
        </Heading>
        <div className={cx('description')} dangerouslySetInnerHTML={{ __html: description }} />
        <Link className={cx('link', 'icon-arrow')} to="/">
          Learn More <IconArrowRight />
        </Link>
      </div>
      <div className={cx('right')}>
        <img className={cx('illustration')} src={illustration} alt="" loading="lazy" />
      </div>
    </div>
  </section>
);

RemoteConfig.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

RemoteConfig.defaultProps = {
  title: 'Remote config',
  description: `<ul>
    <li>With Flagsmith’s remote config capabilities, you can easily change or test out different feature properties without deploying new code.</li>
    <li>Configure different elements of your features–like the font size of a header or color of a CTA button–directly through Flagsmith and release the changes to users in just a few clicks.</li>
  </ul>`,
};

export default RemoteConfig;
