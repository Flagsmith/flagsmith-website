import classNames from 'classnames/bind';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';

import sendGravityFormData from 'utils/send-gravity-form-data';

import Button from '../button';
import Heading from '../heading';

import styles from './subscribe.module.scss';

const cx = classNames.bind(styles);

const FORM_ID = 4;

const Subscribe = ({ title, description, emailPlaceholder, button }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (values) => {
    try {
      sendGravityFormData(FORM_ID, {
        input_1: values.email,
      }).then(() => {
        reset();
      });
    } catch (error) {
      console.log(error.message);
    }
  };
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
          <form className={cx('form')} noValidate onSubmit={handleSubmit(onSubmit)}>
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder={emailPlaceholder}
              ref={register}
            />
            <Button className={cx('button')} type="submit">
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
