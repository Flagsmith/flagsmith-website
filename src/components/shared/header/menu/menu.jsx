import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import Link from 'components/shared/link';

import styles from './menu.module.scss';

const cx = classNames.bind(styles);

const Menu = ({ items }) => {
  return (
    <nav className={cx('wrapper')}>
      <ul className={cx('list')}>
        {menuItems.map(({ label, path, childItems }, index) => (
          <li className={cx('item')} key={index}>
            <Link className={cx('link')} to={path}>
              {label}
            </Link>

            {childItems.nodes.length > 0 && (
              <ul className={cx('dropdown')}>
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
        ))}
      </ul>
    </nav>
  );
};

Menu.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string,
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
