import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import Heading from 'components/shared/heading';
import Link from 'components/shared/link';

import UrlIcon from './images/url.inline.svg';
import styles from './relative-links.module.scss';

const cx = classNames.bind(styles);

const RelativeLinks = ({ title, items }) => (
  <section className={cx('wrapper')}>
    <div className={cx('container', 'inner')}>
      {title && (
        <Heading className={cx('title')} tag="h3" size="lg">
          {title}
        </Heading>
      )}
      <ul className={cx('list')}>
        {items.map(({ link, textPostfix }, index) => (
          <li className={cx('item')} key={index}>
            <span className={cx('icon')}>
              <UrlIcon />
            </span>
            <Link to={link.url} target={link.target} withArrow>
              {link.title} <span className={cx('postfix')}>{textPostfix}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

RelativeLinks.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.shape({
        url: PropTypes.string,
        target: PropTypes.string,
        title: PropTypes.string,
      }),
      textPostfix: PropTypes.string,
    })
  ).isRequired,
};

RelativeLinks.defaultProps = {
  title: '',
};

export default RelativeLinks;
