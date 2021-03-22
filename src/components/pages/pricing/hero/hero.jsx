import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Heading from 'components/shared/heading/heading';
import Prices from './prices';
import ContactForm from './contact-form';

import styles from './hero.module.scss';

import CloudIcon from './images/icon-cloud.inline.svg';
import OnPremIcon from './images/icon-on-prem.inline.svg';

import shape1 from './images/shape-1.svg';
import shape2 from './images/shape-2.svg';

const cx = classNames.bind(styles);

const iconsCollection = {
  cloud: CloudIcon,
  onPrem: OnPremIcon,
};

const Hero = ({ title, description, tabs, prices }) => {
  const [tabNameActive, setTabNameActive] = useState('cloud');

  return (
    <section className={cx('wrapper')}>
      <div className={cx('container', 'inner')}>
        <Heading className={cx('title')} highlightedWordsColor="secondary" innerHTML={title} />
        <p className={cx('description')}>{description}</p>
        <div className={cx('tabs')}>
          {tabs.map(({ key, title, description }, index) => {
            const Icon = iconsCollection[key];
            const handleTabClick = () => setTabNameActive(key);
            return (
              <div
                className={cx('tab', { active: tabNameActive === key })}
                role="button"
                tabIndex="0"
                onClick={handleTabClick}
                key={index}
              >
                <Icon />
                <div className={cx('tab-content')}>
                  <Heading className={cx('tab-title')} size="md">
                    {title}
                  </Heading>
                  <p className={cx('tab-description')}>{description}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className={cx('content', tabNameActive)}>
          {tabNameActive === 'cloud' && <Prices items={prices} />}
          {tabNameActive === 'onPrem' && <ContactForm />}

          <img className={cx('shape', 'shape-1')} src={shape1} alt="" loading="lazy" aria-hidden />
          <img className={cx('shape', 'shape-2')} src={shape2} alt="" loading="lazy" aria-hidden />
        </div>
      </div>
    </section>
  );
};

Hero.defaultProps = {
  tabs: [
    {
      key: 'cloud',
      title: 'Cloud',
      description: 'Flagsmith as a service',
    },
    {
      key: 'onPrem',
      title: 'On Prem',
      description: 'In your enviroment',
    },
  ],
};

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  prices: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      price: PropTypes.string,
      priceLabel: PropTypes.string,
      imageName: PropTypes.string,
      button: PropTypes.shape({
        url: PropTypes.string.isRequired,
        target: PropTypes.string,
        title: PropTypes.string.isRequired,
      }).isRequired,
      features: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          enable: PropTypes.bool,
        })
      ).isRequired,
      theme: PropTypes.string,
    })
  ).isRequired,
};

export default Hero;
