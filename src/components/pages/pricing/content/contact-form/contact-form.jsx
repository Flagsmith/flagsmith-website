import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from 'components/shared/button';
import Heading from 'components/shared/heading';
import Input from 'components/shared/input';
import Link from 'components/shared/link';

import styles from './contact-form.module.scss';

const cx = classNames.bind(styles);

const validationSchema = yup.object().shape({
  name: yup.string().trim().required('Name is a required field'),
  email: yup
    .string()
    .trim()
    .email('Must be a valid email')
    .required('Business email is a required field'),
  phone: yup.string().trim().required('Phone number is a required field'),
  website: yup.string().trim().required('Wibsite is a required field'),
});

const ContactForm = ({ title, description }) => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values) => {
    console.log(`Form submit: ${values}`);
    setIsLoading(true);
  };

  const {
    illustration: {
      childImageSharp: { fixed: illustration },
    },
  } = useStaticQuery(graphql`
    query {
      illustration: file(relativePath: { eq: "pages/pricing/hero/contact-form/illustration.png" }) {
        childImageSharp {
          fixed(height: 370) {
            ...GatsbyImageSharpFixed_withWebp_noBase64
          }
        }
      }
    }
  `);

  return (
    <div className={cx('wrapper')} id="contactForm">
      <div className={cx('inner')}>
        <div className={cx('image-wrapper')}>
          <Img fixed={illustration} alt="" />
        </div>
        <div className={cx('content')}>
          <Heading className={cx('title')} size="lg">
            {title}
          </Heading>
          <p className={cx('description')}>{description}</p>
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
    </div>
  );
};

ContactForm.defaultProps = {
  title: 'Contact Us!',
  description: `Flagmith's on-premise and private cloud hosting solutions offer an added level of control for companies that take privacy and compliance seriously.`,
};

ContactForm.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ContactForm;
