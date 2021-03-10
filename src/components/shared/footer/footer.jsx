import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import MainContext from 'context/main';

import Link from 'components/shared/link';
import MenuItem from './menu-item/menu-item';

import styles from './footer.module.scss';

import Logo from 'images/logo.inline.svg';
import IconArrowRight from 'icons/arrow-right.inline.svg';

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
          <Link className={cx('icon-arrow')} to="https://pixelpoint.io/" target="_blank">
            Pixel Point <IconArrowRight />
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
