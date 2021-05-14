import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';

import Button from 'components/shared/button';
import Link from 'components/shared/link';
import MainContext from 'context/main';
import GithubIcon from 'icons/github.inline.svg';

import styles from './mobile-menu.module.scss';
import SubMenu from './sub-menu';

const cx = classNames.bind(styles);

const MobileMenu = ({ isOpen, onCloseButtonClick }) => {
  const {
    menus: { mobileMenuItems: menuItems },
    sharedBlocks: {
      header: {
        acf: {
          button1: { title: button1Title, url: button1Link, target: button1Target },
          button2: { title: button2Title, url: button2Link, target: button2Target },
        },
      },
    },
  } = useContext(MainContext);

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
        <Button className={cx('button')} to={button1Link} target={button1Target}>
          <GithubIcon className={cx('icon')} />
          {button1Title}
        </Button>
        <Button
          className={cx('button')}
          theme="accent-tertiary"
          to={button2Link}
          target={button2Target}
        >
          {button2Title}
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
