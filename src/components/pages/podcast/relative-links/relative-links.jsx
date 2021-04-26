import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import Heading from 'components/shared/heading';
import Link from 'components/shared/link';
import Arrow from 'icons/arrow-right.inline.svg';

import UrlIcon from './images/url.inline.svg';
import styles from './relative-links.module.scss';

const cx = classNames.bind(styles);

const RelativeLinks = ({ title, items }) => (
  <section className={cx('wrapper')}>
    <div className={cx('container', 'inner')}>
      <Heading className={cx('title')} tag="h3" size="lg">
        {title}
      </Heading>
      <ul className={cx('list')}>
        {items.map(({ url, text }, index) => (
          <li className={cx('item')} key={index}>
            <span className={cx('icon')}>
              <UrlIcon />
            </span>
            <Link to={url} withArrow>
              {text}
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
  ),
};

RelativeLinks.defaultProps = {
  items: [
    { url: '/', text: 'Lorem ipsum dolor sit amet' },
    { url: '/', text: 'Lorem ipsum dolor sit amet' },
    { url: '/', text: 'Lorem ipsum dolor sit amet' },
  ],
};

export default RelativeLinks;
