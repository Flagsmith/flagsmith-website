import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import Link from 'components/shared/link';

import styles from './menu.module.scss';

const cx = classNames.bind(styles);

const Menu = ({ items }) => (
  <nav className={cx('wrapper')}>
    <ul className={cx('list')}>
      {items.map(({ label, path, childItems }, index) => (
        <li className={cx('item')} key={index}>
          <Link className={cx('link')} to={path}>
            {label}
          </Link>

          {childItems && (
            <ul className={cx('dropdown')} key={index}>
              {childItems.map(({ label, path }, index) => (
                <li key={index}>
                  <Link className={cx('link')} to={path}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  </nav>
);

Menu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      childItems: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          path: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
};

Menu.defaultProps = {
  items: [
    {
      label: 'Features',
      path: '/',
      childItems: [
        {
          label: 'Overview',
          path: '/',
        },
        {
          label: 'Phased Rollouts',
          path: '/',
        },
        {
          label: 'Integrations',
          path: '/',
        },
        {
          label: 'Enterprise',
          path: '/',
        },
      ],
    },
    {
      label: 'Solutions',
      path: '/',
    },
    {
      label: 'Resources',
      path: '/',
    },
    {
      label: 'Pricing',
      path: '/',
    },
  ],
};

export default Menu;
