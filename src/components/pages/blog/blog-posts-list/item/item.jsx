import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import Heading from 'components/shared/heading';
import Link from 'components/shared/link';

import styles from './item.module.scss';

const cx = classNames.bind(styles);

const Item = ({ title, info, description, link }) => (
  <div className={cx('wrapper')}>
    <Heading className={cx('title')} tag="h2" size="lg">
      {title}
    </Heading>
    <span className={cx('info')}>{info}</span>
    <p className={cx('description')}>{description}</p>
    <Link className={cx('link')} to={link.url} withArrow>
      {link.title}
    </Link>
  </div>
);

Item.propTypes = {};

Item.defaultProps = {};

export default Item;
