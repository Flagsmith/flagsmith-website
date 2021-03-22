import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { motion } from 'framer-motion';

import Heading from 'components/shared/heading';
import styles from './item.module.scss';

import Arrow from './images/arrow.inline.svg';

const cx = classNames.bind(styles);

const ANIMATION_DURATION = 0.2;

const variantsAnimation = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto' },
};

const Item = ({ id, title, description, index }) => {
  const [isOpen, setIsOpen] = useState(index === 0 ? true : false);

  const handleClick = () => setIsOpen((isOpen) => !isOpen);

  return (
    <div className={cx('wrapper', { open: isOpen })}>
      <dt>
        <Heading
          className={cx('title')}
          tag="button"
          onClick={handleClick}
          aria-expanded={isOpen}
          aria-controls={id}
        >
          <span className={cx('icon')}>
            <Arrow />
          </span>
          {title}
        </Heading>
      </dt>
      <motion.dd
        className={cx('description-wrapper')}
        initial="hidden"
        animate={isOpen ? 'visible' : 'hidden'}
        variants={variantsAnimation}
        transition={{ duration: ANIMATION_DURATION }}
      >
        <div
          id={id}
          className={cx('description')}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </motion.dd>
    </div>
  );
};

Item.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Item;
