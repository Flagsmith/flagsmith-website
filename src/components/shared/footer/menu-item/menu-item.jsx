import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Heading from 'components/shared/heading';
import Link from 'components/shared/link';

import styles from './menu-item.module.scss';

const cx = classNames.bind(styles);

const MenuItem = ({ label: sectionTitle, childItems }) => (
  <div>
    <Heading className={cx('title')} tag="h3" size="md">
      {sectionTitle}
    </Heading>

    <ul className={cx('links')}>
      {childItems.map(({ label, path }, index) => (
        <li key={index}>
          <Link className={cx('link')} to={path}>
            {label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

MenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  childItems: PropTypes.PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MenuItem;