import classNames from 'classnames/bind';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import React from 'react';

import Heading from 'components/shared/heading/heading';
import Link from 'components/shared/link/link';
import IconArrowRight from 'icons/arrow-right.inline.svg';

import IconCheck from './images/check.inline.svg';
import shape1 from './images/shape-1.url.svg';
import shape2 from './images/shape-2.url.svg';
import styles from './options.module.scss';

const cx = classNames.bind(styles);

const Options = ({ title, items }) => {
  const { illustrationSaas, illustrationPrivateCloud, illustrationOnPrem } = useStaticQuery(graphql`
    query {
      illustrationSaas: file(relativePath: { eq: "pages/home/options/illustration-saas.jpeg" }) {
        childImageSharp {
          gatsbyImageData(width: 368)
        }
      }

      illustrationPrivateCloud: file(
        relativePath: { eq: "pages/home/options/illustration-private-cloud.jpeg" }
      ) {
        childImageSharp {
          gatsbyImageData(width: 390)
        }
      }

      illustrationOnPrem: file(
        relativePath: { eq: "pages/home/options/illustration-on-prem.jpeg" }
      ) {
        childImageSharp {
          gatsbyImageData(width: 340)
        }
      }
    }
  `);

  const imageCollection = {
    saas: illustrationSaas,
    privateCloud: illustrationPrivateCloud,
    onPrem: illustrationOnPrem,
  };

  return (
    <section className={cx('wrapper')}>
      <div className={cx('container', 'inner')}>
        <Heading tag="h2" className={cx('title')} size="xl">
          {title}
        </Heading>

        <div className={cx('items-wrapper')}>
          {items.map(({ title, link: { url }, theme, imageName, features }, index) => {
            const image = imageCollection[imageName];
            return (
              <Link className={cx('item', `item-theme-${theme}`)} to={url} key={index}>
                <div className={cx('item-inner')}>
                  <Heading className={cx('item-title')} tag="h3" size="lg">
                    {title}
                  </Heading>

                  <div className={cx('item-image')}>
                    <GatsbyImage image={getImage(image)} alt="" />
                  </div>
                  <div className={cx('item-content')}>
                    <ul className={cx('item-features')}>
                      {features.map(({ text }, index) => (
                        <li key={index}>
                          <IconCheck />
                          {text}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <span className={cx('item-link')}>
                    Learn More <IconArrowRight />
                  </span>
                </div>
              </Link>
            );
          })}

          <img className={cx('shape', 'shape-1')} src={shape1} alt="" loading="lazy" aria-hidden />
          <img className={cx('shape', 'shape-2')} src={shape2} alt="" loading="lazy" aria-hidden />
        </div>
      </div>
    </section>
  );
};

Options.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.shape({
        url: PropTypes.string.isRequired,
      }).isRequired,
      theme: PropTypes.string.isRequired,
      features: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default Options;
