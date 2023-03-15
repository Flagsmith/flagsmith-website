import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { motion } from 'framer-motion';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import MainContext from 'context/main';
import IconCheck from 'icons/check.inline.svg';
import sendGravityFormData from 'utils/send-gravity-form-data';

import Button from '../button';
import Heading from '../heading';

import styles from './subscribe.module.scss';

const cx = classNames.bind(styles);

const FORM_ID = 4;
// It is used for proper loading animation because most of the time we get response from the server almost immediately
const APPEAR_AND_EXIT_ANIMATION_DURATION = 0.5; // seconds

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email('Must be a valid email')
    .required('Please enter your email address.'),
});

const Subscribe = () => {
  const {
    sharedBlocks: {
      subscribe: {
        acf: { title, description, emailPlaceholder, buttonText },
      },
    },
  } = useContext(MainContext);

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [serverResponse, setServerResponse] = useState(null);

  const onSubmit = (values) => {
    setIsLoading(true);
    try {
      sendGravityFormData(FORM_ID, {
        input_1: values.email,
      }).then(() => {
        setIsLoading(false);
        setServerResponse('success');
        reset();
      });
    } catch (error) {
      setIsLoading(false);
      setServerResponse('error');
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
          <motion.div
            animate={
              serverResponse === 'success' && {
                opacity: 0,
                transition: { duration: APPEAR_AND_EXIT_ANIMATION_DURATION },
              }
            }
          >
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
              <Button className={cx('button')} type="submit" loading={isLoading}>
                {buttonText}
              </Button>
              <span className={cx('error')}>{errors?.email?.message}</span>
              {serverResponse === 'error' && (
                <motion.span
                  className={cx('error')}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: APPEAR_AND_EXIT_ANIMATION_DURATION },
                  }}
                >
                  Something went wrong, please, reload the page.
                </motion.span>
              )}
            </form>
          </motion.div>
          {serverResponse === 'success' && (
            <motion.div
              className={cx('message')}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: APPEAR_AND_EXIT_ANIMATION_DURATION },
              }}
            >
              <div className={cx('message-icon')}>
                <IconCheck />
              </div>
              <span className={cx('message-title')}>Success!</span>
              <span className={cx('message-description')}>
                We'll keep you up to date with the latest Flagsmith news.
              </span>
            </motion.div>
          )}
        </div>
        <div className={cx('illustration')}>
          <GatsbyImage image={getImage(subscribeIllustration)} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
