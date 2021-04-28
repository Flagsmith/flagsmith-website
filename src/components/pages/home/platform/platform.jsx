import classNames from 'classnames/bind';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import React from 'react';

import Heading from 'components/shared/heading/heading';

import Item from './item';
import styles from './platform.module.scss';

const cx = classNames.bind(styles);

const Platform = ({ title, items }) => {
  const { illustration } = useStaticQuery(graphql`
    query {
      illustration: file(relativePath: { eq: "pages/home/platform/illustration.png" }) {
        childImageSharp {
          gatsbyImageData(width: 740)
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
              <GatsbyImage image={getImage(illustration)} alt="" />
            </div>
          </div>
        </div>

        <div className={cx('items-wrapper')}>
          {items.map((props, index) => (
            <Item {...props} key={index} />
          ))}
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
