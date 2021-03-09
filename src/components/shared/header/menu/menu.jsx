import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import Link from 'components/shared/link';

import styles from './menu.module.scss';

const cx = classNames.bind(styles);

const Menu = ({ menuItems }) => (
  <nav className={cx('wrapper')}>
    <ul className={cx('list')}>
      {menuItems.map(({ label, path, childItems }, index) => {
        const withChildItems = childItems && childItems.nodes.length > 0;
        return (
          <li className={cx('item')} key={index}>
            <Link className={cx('link')} to={path}>
              {label}
            </Link>

            {withChildItems && (
              <ul className={cx('dropdown')} key={index}>
                {childItems.nodes.map(({ label, path }, index) => (
                  <li key={index}>
                    <Link className={cx('link')} to={path}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  </nav>
);

Menu.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      childItems: PropTypes.shape({
        nodes: PropTypes.arrayOf(
          PropTypes.shape({
            label: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
          })
        ),
      }),
    })
  ).isRequired,
};

export default Menu;
