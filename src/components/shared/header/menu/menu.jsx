import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import Link from 'components/shared/link';

import styles from './menu.module.scss';

const cx = classNames.bind(styles);

const Menu = ({ items }) => (
  <nav className={cx('wrapper')}>
    <ul className={cx('list')}>
      {items.map(({ label, path, childItems }, index) => {
        const withSubMenu = childItems.nodes.length > 0;

        const handleLinkClick = (event) => {
          event.preventDefault();
        };

        return (
          <li className={cx('item')} key={index}>
            {path === '/' ? (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a className={cx('link')} href="#" onClick={handleLinkClick}>
                {label}
              </a>
            ) : (
              <Link className={cx('link')} to={path}>
                {label}
              </Link>
            )}

            {withSubMenu && (
              <ul className={cx('dropdown')}>
                {childItems.nodes.map(({ label, path, childItems }, index) => (
                  <li key={index}>
                    <Link className={cx('link')} to={path}>
                      NODE: {childItems.nodes.length}: {label}
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
  items: PropTypes.arrayOf(
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
