import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import ContactForm from 'components/shared/contact-form';
import FAQ from 'components/shared/faq';
import GetStarted from 'components/shared/get-started';
import Heading from 'components/shared/heading/heading';

import styles from './content.module.scss';
import CloudIcon from './images/icon-cloud.inline.svg';
import OnPremIcon from './images/icon-on-prem.inline.svg';
import shape1 from './images/shape-1.svg';
import shape2 from './images/shape-2.svg';
import Options from './options';
import Prices from './prices';

const cx = classNames.bind(styles);

const iconsCollection = {
  cloud: CloudIcon,
  onPrem: OnPremIcon,
};

const Content = ({ hero: { title, description, tabs, prices, options }, faq, getStartedProps }) => {
  const [tabNameActive, setTabNameActive] = useState('cloud');

  return (
    <>
      <section className={cx('wrapper', 'margin-bottom-lg')}>
        <div className={cx('container', 'inner')}>
          <Heading className={cx('title')} highlightedWordsColor="secondary" innerHTML={title} />
          <p className={cx('description')}>{description}</p>

          <div className={cx('tabs')}>
            {tabs.map(({ iconName: key, title, description }, index) => {
              const Icon = iconsCollection[key];
              const isActive = tabNameActive === key;
              const headingColor = isActive ? 'quaternary' : 'primary';

              const handleTabClick = () => setTabNameActive(key);

              return (
                <div
                  className={cx('tab', { active: isActive })}
                  role="button"
                  tabIndex="0"
                  key={index}
                  onClick={handleTabClick}
                  onKeyDown={handleTabClick}
                >
                  <Icon />
                  <div className={cx('tab-content')}>
                    <Heading className={cx('tab-title')} tag="h3" size="sm" color={headingColor}>
                      {title}
                    </Heading>
                    <p className={cx('tab-description')}>{description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={cx('content', tabNameActive)}>
            <img
              className={cx('shape', 'shape-1')}
              src={shape1}
              alt=""
              loading="lazy"
              aria-hidden
            />
            <img
              className={cx('shape', 'shape-2')}
              src={shape2}
              alt=""
              loading="lazy"
              aria-hidden
            />
            {tabNameActive === 'cloud' && <Prices items={prices} />}
            {tabNameActive === 'onPrem' && <Options items={options} />}
          </div>
        </div>
      </section>

      {tabNameActive === 'cloud' && <FAQ items={faq} />}
      {tabNameActive === 'cloud' && <GetStarted {...getStartedProps} withIndents />}
      {tabNameActive === 'onPrem' && (
        <ContactForm
          id="contact-us"
          title="Contact Us!"
          description={`Flagmith's on-premise and private cloud hosting solutions offer an added level of control for companies that take privacy and compliance seriously.`}
          marginBottom="lg"
        />
      )}
    </>
  );
};

Content.propTypes = {
  hero: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tabs: PropTypes.arrayOf(
      PropTypes.shape({
        iconName: PropTypes.string.isRequired,
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
    options: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        features: PropTypes.arrayOf(
          PropTypes.shape({
            text: PropTypes.string.isRequired,
          })
        ).isRequired,
      })
    ).isRequired,
  }).isRequired,
  faq: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  getStartedProps: PropTypes.shape({}).isRequired,
};

export default Content;
