import React, { useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import MainContext from 'context/main';

import Link from 'components/shared/link';
import Button from 'components/shared/button';
import SubMenu from './sub-menu';

import filterNonRootItems from 'utils/filter-non-root-items';

import GithubIcon from 'icons/github.inline.svg';

import styles from './mobile-menu.module.scss';

const cx = classNames.bind(styles);

const MobileMenu = ({ isOpen, onCloseButtonClick }) => {
  const {
    menus: {
      mobile: {
        menuItems: { nodes: menuItemsNodes },
      },
    },
  } = useContext(MainContext);

  // Graphql does not allow to filter by null values so has to do it manually
  const menuItems = useMemo(() => filterNonRootItems(menuItemsNodes), []);

  return (
    <nav className={cx('wrapper', { open: isOpen })}>
      <ul className={cx('menu')}>
        {menuItems.map(({ label, path, childItems }, index) => {
          const withChildItems = childItems.nodes.length > 0;

          return (
            <li className={cx('item')} key={index}>
              <Link className={cx('link')} to={path}>
                {label}
              </Link>
              {withChildItems && <SubMenu items={childItems.nodes} />}
            </li>
          );
        })}
      </ul>
      <div className={cx('buttons-wrapper')}>
        <Button className={cx('button')} to="/">
          <GithubIcon className={cx('icon')} />
          GitHub
        </Button>
        <Button className={cx('button')} theme="accent-tertiary" to="/">
          Sign in
        </Button>
      </div>
      <button
        className={cx('close-button')}
        type="button"
        aria-label="Close Mobile Menu"
        onClick={onCloseButtonClick}
      />
    </nav>
  );
};

MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseButtonClick: PropTypes.func.isRequired,
};

export default MobileMenu;
