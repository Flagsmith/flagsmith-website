import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Link from 'components/shared/link';
import MenuItem from './menu-item/menu-item';

import styles from './footer.module.scss';

import Logo from 'images/logo.inline.svg';
import IconArrowRight from 'icons/arrow-right.inline.svg';

const cx = classNames.bind(styles);

const Footer = ({ items }) => {
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
          {items.map(({ label, childItems }, index) => (
            <MenuItem label={label} childItems={childItems} key={index} />
          ))}
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  items: PropTypes.PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      childItems: PropTypes.PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          path: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

Footer.defaultProps = {
  items: [
    {
      label: 'Product',
      childItems: [
        {
          label: 'Demo Account',
          path: '/',
        },
        {
          label: 'Documentation',
          path: '/',
        },
        {
          label: 'Podcast',
          path: '/',
        },
        {
          label: 'Pricing',
          path: '/',
        },
      ],
    },
    {
      label: 'Company',
      childItems: [
        {
          label: 'Terms of Service',
          path: '/',
        },
        {
          label: 'Privacy Policy',
          path: '/',
        },
        {
          label: 'SLA',
          path: '/',
        },
      ],
    },
    {
      label: 'Support',
      childItems: [
        {
          label: 'Contact Us',
          path: '/',
        },
        {
          label: 'Roadmap',
          path: '/',
        },
      ],
    },
  ],
};

export default Footer;
