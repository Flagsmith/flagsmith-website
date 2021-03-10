import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import classNames from 'classnames/bind';
import MainContext from 'context/main';

import Heading from 'components/shared/heading/heading';
import Button from 'components/shared/button/button';

import styles from './get-started.module.scss';

const cx = classNames.bind(styles);

const GetStarted = () => {
  const {
    sharedBlocks: {
      getStarted: {
        acf: {
          title,
          description,
          button: { title: buttonTitle, url: buttonLink, target: buttonTarget },
        },
      },
    },
  } = useContext(MainContext);

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
            <Button className={cx('button')} to={buttonLink} target={buttonTarget}>
              {buttonTitle}
            </Button>
          </div>

          <div className={cx('illustration-wrapper')}>
            <Img fluid={illustration} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
