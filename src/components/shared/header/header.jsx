import React from 'react';

import classNames from 'classnames/bind';
import Link from 'components/shared/link';
import Menu from './menu/menu';

import Logo from 'images/logo.inline.svg';

import Button from '../button/button';
import GithubIcon from 'icons/github.inline.svg';

import styles from './header.module.scss';

const cx = classNames.bind(styles);

const Header = (props) => (
  <header className={cx('wrapper')}>
    <div className={cx('container', 'inner')}>
      <Link className={cx('logo-wrapper')} to="/">
        <Logo />
      </Link>

      <div className={cx('menu-wrapper')}>
        <Menu />
        <Button className={cx('button')} theme="tertiary" to="/">
          <GithubIcon />
        </Button>
        <Button size="md" to="/">
          Sign in
        </Button>
      </div>
    </div>
  </header>
);

export default Header;
