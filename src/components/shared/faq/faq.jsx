import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './faq.module.scss';
import Item from './item';

const cx = classNames.bind(styles);

const FAQ = ({ items, marginBottom }) => (
  <section
    className={cx(
      'wrapper',
      { [`margin-bottom-${marginBottom}`]: marginBottom },
      { 'margin-default': !marginBottom }
    )}
  >
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
  marginBottom: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
};

FAQ.defaultProps = {
  marginBottom: null,
};

export default FAQ;
