import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import Link from 'components/shared/link';

import transformNav from '../../../../utils/transform-nav';

import styles from './menu.module.scss';

const cx = classNames.bind(styles);

const Menu = ({ items }) => (
  <nav className={cx('wrapper')}>
    <ul className={cx('list')}>
      {items.map(({ label, path, childItems }, index) => {
        const { withSubMenu, structuredItems } = transformNav(childItems, label, path);
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
              <div className={cx('dropdown', { multilevel: structuredItems.length > 1 })}>
                {structuredItems.map(({ name, childItems }) => (
                  <div>
                    {structuredItems.length > 1 && <strong>{name}</strong>}
                    {childItems.map(({ label, path }, index) => (
                      <div key={index}>
                        <Link className={cx('link')} to={path}>
                          {label}
                        </Link>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
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
