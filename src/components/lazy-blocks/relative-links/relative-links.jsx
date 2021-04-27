import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import Heading from 'components/shared/heading';
import Link from 'components/shared/link';

import UrlIcon from './images/url.inline.svg';
import styles from './relative-links.module.scss';

const cx = classNames.bind(styles);

const RelativeLinks = ({ title, items, isblank }) => (
  <section className={cx('wrapper')}>
    <div className={cx('container', 'inner')}>
      <Heading className={cx('title')} tag="h3" size="lg">
        {title}
      </Heading>
      <ul className={cx('list')}>
        {items.map(({ url, text, textPostfix }, index) => (
          <li className={cx('item')} key={index}>
            <span className={cx('icon')}>
              <UrlIcon />
            </span>
            <Link target={isblank ? '_blank' : '_self'} to={url} withArrow>
              {text} <span className={cx('postfix')}>{textPostfix}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

RelativeLinks.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default RelativeLinks;
