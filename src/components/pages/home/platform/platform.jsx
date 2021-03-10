import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

import Heading from 'components/shared/heading/heading';
import Item from './item';

import styles from './platform.module.scss';

const cx = classNames.bind(styles);

const Platform = ({ title, items }) => {
  const {
    illustration: {
      childImageSharp: { fixed: illustration },
    },
  } = useStaticQuery(graphql`
    query {
      illustration: file(relativePath: { eq: "pages/home/platform/illustration.png" }) {
        childImageSharp {
          fixed(width: 1040, quality: 95) {
            ...GatsbyImageSharpFixed_withWebp_noBase64
          }
        }
      }
    }
  `);

  return (
    <section className={cx('wrapper')}>
      <div className={cx('container', 'inner')}>
        <div className={cx('left')}>
          <div className={cx('left-inner')}>
            <Heading className={cx('title')} tag="h2">
              {title}
            </Heading>

            <div className={cx('illustration-wrapper')}>
              <Img fixed={illustration} alt="" />
            </div>
          </div>
        </div>

        <div className={cx('items-wrapper')}>
          {items.map((props, index) => {
            return <Item {...props} key={index} />;
          })}
        </div>
      </div>
    </section>
  );
};

Platform.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      iconName: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Platform;
