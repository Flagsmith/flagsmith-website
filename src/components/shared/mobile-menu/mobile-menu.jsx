import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';

import Button from 'components/shared/button';
import Link from 'components/shared/link';
import MainContext from 'context/main';
import GithubIcon from 'icons/github.inline.svg';

import transformNav from '../../../utils/transform-nav';

import styles from './mobile-menu.module.scss';
import SubMenu from './sub-menu';

const cx = classNames.bind(styles);

const MobileMenu = ({ isOpen, onCloseButtonClick }) => {
  const {
    menus: { headerMenuItems: menuItems },
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
        {menuItems.map(({ childItems, label, path }) => {
          const { withSubMenu, structuredItems } = transformNav(childItems, label, path);
          const handleLinkClick = (event) => {
            event.preventDefault();
          };
          const showSubTitle = structuredItems.length >= 2;
          return (
            <>
              <h2 className={cx('link')}>
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
              </h2>
              {structuredItems.map(({ childItems, name, path }) => (
                <li className={cx('item')} key={name}>
                  {showSubTitle && (
                    <Link className={cx('link')} to={path}>
                      {name}
                    </Link>
                  )}
                  {withSubMenu && <SubMenu items={childItems} />}
                </li>
              ))}
            </>
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
