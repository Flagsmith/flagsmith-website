import classNames from 'classnames/bind';
import React, { useContext } from 'react';

import Link from 'components/shared/link';
import MainContext from 'context/main';
import GithubIcon from 'icons/github.inline.svg';
import Logo from 'images/logo.inline.svg';

import Button from '../button/button';


import styles from './header.module.scss';
import Menu from './menu/menu';

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
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
};

export default Header;
