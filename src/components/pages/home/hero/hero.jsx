import classNames from 'classnames/bind';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import React from 'react';

import Button from 'components/shared/button/button';
import Heading from 'components/shared/heading/heading';

import Features from './features/features';
import styles from './hero.module.scss';
import Logos from './logos/logos';

const cx = classNames.bind(styles);

const Hero = ({ title, description, button, codeLabel, code, logosTitle, logos, testimonials }) => {
  const { wistiaProfilePic, zuelkheProfilePic, smartexProfilePic } = useStaticQuery(graphql`
    query {
      wistiaProfilePic: file(relativePath: { eq: "pages/home/hero/nick_quaranto.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 100)
        }
      }
      zuelkheProfilePic: file(relativePath: { eq: "pages/home/hero/romano_roth.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 100)
        }
      }
      smartexProfilePic: file(relativePath: { eq: "pages/home/hero/jared_baribeau.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 100)
        }
      }
    }
  `);

  const imageCollection = {
    Wistia: wistiaProfilePic,
    Zuehlke: zuelkheProfilePic,
    Smartex: smartexProfilePic,
  };

  return (
    <section className={cx('wrapper')}>
      <div className={cx('container', 'inner')}>
        <Heading className={cx('title')}>{title}</Heading>
        <p className={cx('description')}>{description}</p>
        <Button
          className={cx('button')}
          theme="accent-primary"
          to={button.url}
          target={button.target}
        >
          {button.title}
        </Button>
        <Features codeLabel={codeLabel} code={code} />
        <Logos title={logosTitle} items={logos} />
      </div>
      <div className={cx('container')}>
        <div className={cx('inner')}>
          {!!testimonials?.length && (
            <div className={cx('testimonials-wrapper')}>
              {testimonials.map(({ quote, customername, company }, index) => {
                const image = imageCollection[company];

                return (
                  <div key={index} className={cx('testimonial')}>
                    <p className={cx('quote')}>{quote}</p>
                    <div className={cx('testimonial-bio')}>
                      <div className={cx('testimonial-headshot')}>
                        <GatsbyImage
                          image={getImage(image)}
                          alt="{customername}"
                          style={{ borderRadius: '10%' }}
                        />
                      </div>
                      <div className={cx('testimonial-name')}>
                        <h3>
                          {customername}
                          <br />
                          <em>{company}</em>
                        </h3>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  button: PropTypes.shape({
    url: PropTypes.string,
    target: PropTypes.string,
    title: PropTypes.string,
  }),
};

export default Hero;
