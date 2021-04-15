import classNames from 'classnames/bind';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import React from 'react';

import Button from '../button';
import Heading from '../heading';

import styles from './subscribe.module.scss';

const cx = classNames.bind(styles);

const Subscribe = ({ title, description, emailPlaceholder, button }) => {
  const { subscribeIllustration } = useStaticQuery(graphql`
    query {
      subscribeIllustration: file(
        relativePath: { eq: "shared/subscribe/subscribe-illustration.jpg" }
      ) {
        childImageSharp {
          gatsbyImageData(width: 450)
        }
      }
    }
  `);
  return (
    <section className={cx('wrapper')}>
      <div className={cx('container', 'inner')}>
        <div className={cx('content')}>
          <Heading className={cx('title')} tag="h2">
            {title}
          </Heading>
          <div className={cx('description')} dangerouslySetInnerHTML={{ __html: description }} />
          <form className={cx('form')}>
            <input type="email" placeholder={emailPlaceholder} />
            <Button className={cx('button')} to={button.url}>
              {button.title}
            </Button>
          </form>
        </div>
        <div className={cx('illustration')}>
          <GatsbyImage image={getImage(subscribeIllustration)} alt="" />
        </div>
      </div>
    </section>
  );
};

Subscribe.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  emailPlaceholder: PropTypes.string.isRequired,
  button: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default Subscribe;
