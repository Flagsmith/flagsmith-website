import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import ContactForm from 'components/shared/contact-form';
import GetStarted from 'components/shared/get-started';
import Heading from 'components/shared/heading/heading';

import styles from './content.module.scss';
import FAQ from './faq';
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

const Content = ({ tabs, hero: { title, description, prices }, faq, options, getStartedProps }) => {
  const [tabNameActive, setTabNameActive] = useState('cloud');

  return (
    <>
      <section className={cx('wrapper', 'margin-bottom-lg')}>
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
                  key={index}
                  onClick={handleTabClick}
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
            {tabNameActive === 'onPrem' && <Options items={options} />}

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
          </div>
        </div>
      </section>

      {tabNameActive === 'cloud' && <FAQ items={faq} />}
      {tabNameActive === 'cloud' && <GetStarted {...getStartedProps} withPaddings />}
      {tabNameActive === 'onPrem' && (
        <ContactForm
          id="contactForm"
          title="Contact Us!"
          description={`Flagmith's on-premise and private cloud hosting solutions offer an added level of control for companies that take privacy and compliance seriously.`}
          marginBottom="lg"
        />
      )}
    </>
  );
};

Content.defaultProps = {
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
  options: [
    {
      theme: 'accent-primary',
      title: 'Private cloud',
      features: [
        {
          text: `Flagsmith's single-tenancy private cloud solution provides the benefits of cloud performance on a secure, dedicated infrastructure without having to manage it yourself.`,
        },
        {
          text: `It's flexible and reliable, and can help teams looking to optimize resources or meet specific compliance requirements.`,
        },
      ],
    },
    {
      theme: 'accent-secondary',
      title: 'On-premise',
      features: [
        {
          text:
            'For teams looking to manage their infrastructure, Flagsmith can be hosted entirely on-premise.',
        },
        {
          text:
            'Co-locating feature flags provides It maximum application-level security and minimizes service-to-service latency.',
        },
        {
          text: 'Deploying on-prem gives you full control.',
        },
      ],
    },
  ],
};

Content.propTypes = {
  hero: PropTypes.objectOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
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
    })
  ).isRequired,

  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,

  options: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      theme: PropTypes.string.isRequired,
      features: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default Content;
