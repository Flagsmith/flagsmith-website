import classNames from 'classnames/bind';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Button from 'components/shared/button';
import Heading from 'components/shared/heading';

import Check from './images/check.inline.svg';
import MostPopular from './images/most-popular.inline.svg';
import UnCheck from './images/uncheck.inline.svg';
import styles from './prices.module.scss';

const cx = classNames.bind(styles);

const Prices = ({ items }) => {
  // const [payType, setPayType] = useState('yearly');

  const { illustrationFree, illustrationEnterprise } = useStaticQuery(graphql`
    query {
      illustrationFree: file(relativePath: { eq: "pages/pricing/hero/prices/free.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 280)
        }
      }

      illustrationEnterprise: file(
        relativePath: { eq: "pages/pricing/hero/prices/enterprise.jpg" }
      ) {
        childImageSharp {
          gatsbyImageData(width: 260)
        }
      }
    }
  `);

  const imageCollection = {
    free: illustrationFree,
    enterprise: illustrationEnterprise,
  };

  // const isPayTypeMonthly = payType === 'monthly';
  // const isPayTypeYearly = payType === 'yearly';

  // const handlePayType = () => {
  //   const type = isPayTypeYearly ? 'monthly' : 'yearly';
  //   setPayType(type);
  // };

  return (
    <div className={cx('wrapper')}>
      {/* <div className={cx('switch-button-wrapper')}>
        <span className={cx({ active: isPayTypeYearly })}>Pay Yearly</span>
        <button
          className={cx('switch-button', {
            checked: isPayTypeMonthly,
          })}
          onClick={handlePayType}
        />
        <span className={cx({ active: isPayTypeMonthly })}>Pay Monthly</span>
      </div> */}

      <div className={cx('inner')}>
        <div className={cx('items-wrapper')}>
          {items.map((item, index) => {
            const {
              title,
              description,
              price,
              imageName,
              button: { title: buttonTitle, url: buttonUrl, target: buttonTarget },
              features,
              theme,
              isMostPopular,
            } = item;

            const image = imageCollection[imageName];
            return (
              <div className={cx('item', theme)} key={index}>
                <div className={cx('head')}>
                  <div className={cx('head-inner')}>
                    <Heading className={cx('title')} size="lg" color={theme}>
                      {title}
                    </Heading>
                    {description && <p className={cx('description')}>{description}</p>}
                    {price && (
                      <div className={cx('price-wrapper')}>
                        <span className={cx('price')}>{price}</span>
                        <span className={cx('price-text')}>
                          {/* Billed {isPayTypeMonthly ? 'monthly' : 'yearly'} */}
                          Billed monthly
                        </span>
                        {isMostPopular && (
                          <MostPopular className={cx('most-popular')} aria-label="Most Popular" />
                        )}
                      </div>
                    )}
                    {!price && (
                      <div className={cx('image-wrapper', imageName)}>
                        <GatsbyImage image={getImage(image)} alt="" />
                      </div>
                    )}
                  </div>
                  <Button
                    className={cx('button')}
                    theme={theme}
                    to={buttonUrl}
                    target={buttonTarget}
                  >
                    {buttonTitle}
                  </Button>
                </div>
                <ul className={cx('features')}>
                  {features.map(({ text, enable }, index) => (
                    <li className={cx({ enable })} key={index}>
                      {enable ? <Check /> : <UnCheck />}
                      <div dangerouslySetInnerHTML={{ __html: text }} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

Prices.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      price: PropTypes.string,
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
      isMostPopular: PropTypes.bool,
    })
  ).isRequired,
};

export default Prices;
