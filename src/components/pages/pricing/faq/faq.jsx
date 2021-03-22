import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Item from './item';

import styles from './faq.module.scss';

const cx = classNames.bind(styles);

const FAQ = ({ items }) => (
  <section className={cx('wrapper')}>
    <div className={cx('container', 'inner')}>
      {items.map(({ title, description }, index) => {
        const id = `faq-item-${index + 1}`;
        return <Item id={id} title={title} description={description} index={index} key={index} />;
      })}
    </div>
  </section>
);

FAQ.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default FAQ;
