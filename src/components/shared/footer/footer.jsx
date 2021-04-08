import classNames from 'classnames/bind';
import React, { useContext } from 'react';

import Link from 'components/shared/link';
import MainContext from 'context/main';
import Logo from 'images/logo.inline.svg';

import styles from './footer.module.scss';
import MenuItem from './menu-item/menu-item';



const cx = classNames.bind(styles);

const Footer = () => {
  const {
    menus: { footerMenuItems: menuItems },
  } = useContext(MainContext);

  return (
    <footer className={cx('wrapper')}>
      <div className={cx('container', 'inner')}>
        <div className={cx('logo-wrapper')}>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <span className={cx('copyright')}>
          Creative design made by
          <Link to="https://pixelpoint.io/" target="_blank" withArrow>
            Pixel Point
          </Link>
        </span>

        <div className={cx('menu')}>
          {menuItems.map(({ label, childItems }, index) => (
            <MenuItem label={label} childItems={childItems.nodes} key={index} />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
