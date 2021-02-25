import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import classNames from 'classnames/bind';

import Heading from 'components/shared/heading/heading';
import Button from 'components/shared/button/button';

import styles from './get-started.module.scss';

const cx = classNames.bind(styles);

const GetStarted = ({ title, description, buttonText, buttonLink }) => {
  const {
    illustration: {
      childImageSharp: { fluid: illustration },
    },
  } = useStaticQuery(graphql`
    query {
      illustration: file(relativePath: { eq: "pages/home/get-started/illustration.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
    }
  `);
  return (
    <section className={cx('wrapper')}>
      <div className="container">
        <div className={cx('inner')}>
          <div className={cx('content')}>
            <Heading className={cx('title')} tag="h2">
              {title}
            </Heading>
            <p className={cx('description')}>{description}</p>
            <Button to={buttonLink}>{buttonText}</Button>
          </div>

          <div className={cx('illustration-wrapper')}>
            <Img fluid={illustration} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

GetStarted.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonLink: PropTypes.string.isRequired,
};

GetStarted.defaultProps = {
  title: 'Get started',
  description: 'Enhance customer experience by bringing feature flags to your projects',
  buttonText: 'Start Free Trial',
  buttonLink: '/',
};

export default GetStarted;
