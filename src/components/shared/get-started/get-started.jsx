import classNames from 'classnames/bind';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import React from 'react';

import Button from 'components/shared/button/button';
import Heading from 'components/shared/heading/heading';

import styles from './get-started.module.scss';

const cx = classNames.bind(styles);

const GetStarted = ({ title, description, buttonText, buttonUrl, withPaddings, marginBottom }) => {
  const { illustration } = useStaticQuery(graphql`
    query {
      illustration: file(relativePath: { eq: "pages/home/get-started/illustration.png" }) {
        childImageSharp {
          gatsbyImageData(width: 734)
        }
      }
    }
  `);
  return (
    <section
      className={cx('wrapper', { withPaddings, [`margin-bottom-${marginBottom}`]: marginBottom })}
    >
      <div className="container">
        <div className={cx('inner')}>
          <div className={cx('content')}>
            <Heading className={cx('title')} tag="h2">
              {title}
            </Heading>
            {description && <p className={cx('description')}>{description}</p>}
            <Button className={cx('button')} to={buttonUrl}>
              {buttonText}
            </Button>
          </div>

          <div className={cx('illustration-wrapper')}>
            <GatsbyImage image={getImage(illustration)} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

GetStarted.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
  buttonUrl: PropTypes.string.isRequired,
  withPaddings: PropTypes.bool,
  marginBottom: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
};

GetStarted.defaultProps = {
  description: '',
  withPaddings: false,
  marginBottom: null,
};

export default GetStarted;
