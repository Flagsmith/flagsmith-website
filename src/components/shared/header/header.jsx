import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Link from 'components/shared/link';
import Menu from './menu/menu';

import Logo from 'images/logo.inline.svg';

import Button from '../button/button';
import GithubIcon from 'icons/github.inline.svg';

import styles from './header.module.scss';

const cx = classNames.bind(styles);

const Header = ({ onBurgerClick }) => (
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

Header.propTypes = {
  onBurgerClick: PropTypes.func.isRequired,
};

export default Header;
