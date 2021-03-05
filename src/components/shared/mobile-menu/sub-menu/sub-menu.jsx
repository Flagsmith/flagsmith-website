import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './sub-menu.module.scss';
import Link from 'components/shared/link';

const cx = classNames.bind(styles);

const SubMenu = ({ items }) => (
  <ul className={cx('wrapper')}>
    {items.map(({ label, path }, index) => (
      <li className={cx('item')} key={index}>
        <Link className={cx('link')} to={path}>
          {label}
        </Link>
      </li>
    ))}
  </ul>
);

SubMenu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ),
};

export default SubMenu;
