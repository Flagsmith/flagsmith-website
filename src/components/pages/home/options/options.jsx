import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Heading from 'components/shared/heading/heading';
import Link from 'components/shared/link/link';

import styles from './options.module.scss';

import shape1 from './images/shape-1.url.svg';
import shape2 from './images/shape-2.url.svg';
import IconCheck from './images/check.inline.svg';
import IconArrowRight from 'icons/arrow-right.inline.svg';

const cx = classNames.bind(styles);

const Options = ({ title, items }) => (
  <div className={cx('wrapper')}>
    <div className="container">
      <Heading tag="h2" className={cx('title')} size="xl">
        {title}
      </Heading>

      <div className={cx('items-wrapper')}>
        {items.map(({ title, path, theme, features }, index) => (
          <Link className={cx('item', `item-theme-${theme}`)} to={path} key={index}>
            <div className={cx('item-inner')}>
              <div className={cx('item-content')}>
                <Heading className={cx('item-title')} tag="h3" size="lg">
                  {title}
                </Heading>

                <div className={cx('item-image')}></div>

                <ul className={cx('item-features')}>
                  {features.map((feature, index) => (
                    <li key={index}>
                      <IconCheck />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <span className={cx('item-button')}>
                Learn more <IconArrowRight />
              </span>
            </div>
          </Link>
        ))}

        <img className={cx('shape', 'shape-1')} src={shape1} alt="" loading="lazy" aria-hidden />
        <img className={cx('shape', 'shape-2')} src={shape2} alt="" loading="lazy" aria-hidden />
      </div>
    </div>
  </div>
);

Options.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      theme: PropTypes.string.isRequired,
      features: PropTypes.arrayOf(PropTypes.any).isRequired,
    })
  ).isRequired,
};

Options.defaultProps = {
  title: 'Check the different options',
  items: [
    {
      title: 'SaaS',
      path: '/',
      theme: 'accent-primary',
      features: [
        'Try our enterprise-grade SaaS offering hosted by Flagsmith.',
        'Optimized over six regions across the world. Choose your location to minimize latency and manage data sovereignty',
      ],
    },
    {
      title: 'Private Cloud',
      path: '/',
      theme: 'primary',
      features: [
        'Fully managed private deployments',
        'Have us host in your own private instance',
        'Fully managed private deployments',
        'Added security',
      ],
    },
    {
      title: 'On Prem',
      path: '/',
      theme: 'accent-secondary',
      features: [
        'Self host',
        'Good for privacy-conscious',
        'With support from the Flagsmith team',
        'OpenShift / Kubernetes operator',
      ],
    },
  ],
};

export default Options;