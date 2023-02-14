import classNames from 'classnames/bind';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
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

  const { soc2 } = useStaticQuery(graphql`
    query {
      soc2: file(relativePath: { eq: "shared/soc2.png" }) {
        childImageSharp {
          gatsbyImageData(width: 200)
        }
      }
    }
  `);

  return (
    <footer className={cx('wrapper')}>
      <div className={cx('container', 'inner')}>
        <div className={cx('logo-wrapper')}>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className={cx('soc2-wrapper')}>
          <Link to="/">
            <GatsbyImage image={getImage(soc2)} alt="Soc2 Compliant" />
          </Link>
        </div>
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
