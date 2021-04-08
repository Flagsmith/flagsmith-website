import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from 'components/shared/button';
import Heading from 'components/shared/heading';
import Input from 'components/shared/input';
import Link from 'components/shared/link';
import sendGravityFormData from 'utils/send-gravity-form-data';

import styles from './contact-form.module.scss';
import shape1 from './images/shape-1.svg';
import shape2 from './images/shape-2.svg';

const cx = classNames.bind(styles);

const FORM_ID = 2;

const validationSchema = yup.object().shape({
  name: yup.string().trim().required('Name is a required field'),
  email: yup
    .string()
    .trim()
    .email('Must be a valid email')
    .required('Business email is a required field'),
  phone: yup.string().trim().required('Phone number is a required field'),
  website: yup.string().trim().required('Website is a required field'),
});

const ContactForm = ({
  id,
  title,
  titleHighlightColor,
  description,
  withBackground,
  marginBottom,
}) => {
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (values) => {
    setIsLoading(true);

    try {
      sendGravityFormData(FORM_ID, {
        input_1: values.name,
        input_2: values.email,
        input_3: values.phone,
        input_5: values.website,
      }).then(() => {
        reset();
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
    }
  };

  const { illustration } = useStaticQuery(graphql`
    query {
      illustration: file(relativePath: { eq: "pages/pricing/hero/contact-form/illustration.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 520)
        }
      }
    }
  `);

  return (
    <section
      id={id}
      className={cx('wrapper', {
        'with-background': withBackground,
        primary: withBackground,
        [`margin-bottom-${marginBottom}`]: marginBottom,
      })}
    >
      <div className={cx('inner-wrapper')}>
        <div className={cx('inner')}>
          <div className={cx('image-wrapper')}>
            <GatsbyImage className={cx('illustration')} image={getImage(illustration)} alt="" />
          </div>
          <div className={cx('content')}>
            <div className={cx('header')}>
              <Heading
                className={cx('title')}
                tag="h2"
                size="lg"
                highlightedWordsColor={titleHighlightColor}
                innerHTML={title}
                highlightedWordsWithoutWrap={false}
              />
              {description && (
                <p
                  className={cx('description')}
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              )}
            </div>
            <form className={cx('form')} noValidate onSubmit={handleSubmit(onSubmit)}>
              <Input
                name="name"
                placeholder="Your name"
                autoComplete="name"
                error={errors?.name?.message}
                ref={register}
              />
              <Input
                name="email"
                placeholder="Your business email"
                autoComplete="email"
                error={errors?.email?.message}
                ref={register}
              />
              <Input
                name="phone"
                placeholder="Your phone number (include your country code)"
                autoComplete="tel"
                error={errors?.phone?.message}
                ref={register}
              />
              <Input
                name="website"
                placeholder="Website to install Flagsmith on"
                autoComplete="url"
                error={errors?.website?.message}
                ref={register}
              />

              <div className={cx('form-footer')}>
                <Button className={cx('button')} type="submit" loading={isLoading}>
                  Book a demo
                </Button>
                <span className={cx('form-footer-text')}>or</span>
                <Link className={cx('link')} to="/" withArrow>
                  Start free trial
                </Link>
              </div>
            </form>
          </div>
        </div>

        {withBackground && (
          <>
            <img
              className={cx('shape', 'shape-1')}
              loading="lazy"
              src={shape1}
              alt=""
              aria-hidden
            />
            <img
              className={cx('shape', 'shape-2')}
              loading="lazy"
              src={shape2}
              alt=""
              aria-hidden
            />
          </>
        )}
      </div>
    </section>
  );
};

ContactForm.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  titleHighlightColor: PropTypes.oneOf(['primary', 'secondary']),
  description: PropTypes.string,
  withBackground: PropTypes.bool,
  marginBottom: null,
};

ContactForm.defaultProps = {
  id: '',
  titleHighlightColor: 'primary',
  description: '',
  withBackground: false,
  marginBottom: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
};

export default ContactForm;
