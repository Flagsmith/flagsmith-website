import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import GithubIcon from 'icons/github.inline.svg';
import styles from './mobile-menu.module.scss';
import Link from 'components/shared/link';
import SubMenu from './sub-menu';
import Button from 'components/shared/button';

const cx = classNames.bind(styles);

const MobileMenu = ({ items, isOpen, onCloseButtonClick }) => (
  <nav className={cx('wrapper', { open: isOpen })}>
    <ul className={cx('menu')}>
      {items.map(({ label, path, childItems }, index) => {
        const withChildItems = childItems && childItems.length > 0;
        return (
          <li className={cx('item')} key={index}>
            <Link className={cx('link')} to={path}>
              {label}
            </Link>
            {withChildItems && <SubMenu items={childItems} />}
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

MobileMenu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      childItems: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          path: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
};

MobileMenu.defaultProps = {
  items: [
    {
      label: 'Features',
      path: '/',
      childItems: [
        {
          label: 'Overview',
          path: '/',
        },
        {
          label: 'Phased Rollouts',
          path: '/',
        },
        {
          label: 'Integrations',
          path: '/',
        },
        {
          label: 'Enterprise',
          path: '/',
        },
      ],
    },
    {
      label: 'Solutions',
      path: '/',
      childItems: [
        {
          label: 'SaaS',
          path: '/',
        },
        {
          label: 'On premises & Private cloud',
          path: '/',
        },
        {
          label: 'Open source',
          path: '/',
        },
      ],
    },
    {
      label: 'Resources',
      path: '/',
      childItems: [
        {
          label: 'Docs',
          path: '/',
        },
        {
          label: 'Blog',
          path: '/',
        },
        {
          label: 'Podcast',
          path: '/',
        },
      ],
    },
  ],
};

export default MobileMenu;
