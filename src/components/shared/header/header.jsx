import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import Link from 'components/shared/link';
import Menu from './menu/menu';

import Logo from 'images/logo.inline.svg';
import MainContext from 'context/main';

import Button from '../button/button';
import GithubIcon from 'icons/github.inline.svg';

import styles from './header.module.scss';

const cx = classNames.bind(styles);

const Header = ({ onBurgerClick }) => {
  const {
    menus: { headerMenuItems: menuItems },
    sharedBlocks: {
      header: {
        acf: {
          button1: { url: button1Link, target: button1Target },
          button2: { title: button2Title, url: button2Link, target: button2Target },
        },
      },
    },
  } = useContext(MainContext);

  return (
    <header className={cx('wrapper')}>
      <div className={cx('container', 'inner')}>
        <Link className={cx('logo-wrapper')} to="/">
          <Logo />
        </Link>

        <div className={cx('menu-wrapper')}>
          <Menu items={menuItems} />
          <Button className={cx('button')} theme="tertiary" to={button1Link} target={button1Target}>
            <GithubIcon />
          </Button>
          <Button size="md" to={button2Link} target={button2Target}>
            {button2Title}
          </Button>
        </div>
        <button
          className={cx('burger')}
          type="button"
          aria-label="Open Mobile Menu"
          onClick={onBurgerClick}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
