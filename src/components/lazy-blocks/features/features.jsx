import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import Heading from 'components/shared/heading';
import Link from 'components/shared/link';

import styles from './features.module.scss';

const cx = classNames.bind(styles);

const Features = ({ title, titleHighlightColor, items, columns, withBackground, marginBottom }) => (
  <section
    className={cx('wrapper', {
      'with-background': withBackground,
      secondary: withBackground,
      [`margin-bottom-${marginBottom}`]: marginBottom,
    })}
  >
    <div className={cx('container', 'inner')}>
      {title && (
        <Heading
          className={cx('title')}
          tag="h2"
          size="xl"
          highlightedWordsColor={titleHighlightColor}
          innerHTML={title}
          highlightedWordsWithoutWrap={false}
        />
      )}
      <ul className={cx('items-wrapper', `columns-${columns}`)}>
        {items.map(({ title, titleHighlightColor, content, linkText, linkUrl }, index) => {
          const featureNumber = index + 1;
          return (
            <li className={cx('item')} key={index}>
              <span className={cx('item-number')}>{featureNumber}</span>
              <Heading
                className={cx('item-title')}
                tag="h3"
                size="md"
                color="quaternary"
                highlightedWordsColor={titleHighlightColor}
                innerHTML={title}
                highlightedWordsWithoutWrap={false}
              />
              {content && (
                <div className={cx('item-content')} dangerouslySetInnerHTML={{ __html: content }} />
              )}
              {linkText && linkUrl && (
                <Link className={cx('item-link')} to={linkUrl} withArrow>
                  {linkText}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);

Features.propTypes = {
  title: PropTypes.string,
  titleHighlightColor: PropTypes.oneOf(['primary', 'secondary']),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      titleHighlightColor: PropTypes.oneOf(['primary', 'secondary']),
      content: PropTypes.string,
      linkText: PropTypes.string,
      linkUrl: PropTypes.string,
    })
  ).isRequired,
  columns: PropTypes.oneOf(['2', '3', '4']).isRequired,
  withBackground: PropTypes.bool,
  marginBottom: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
};

Features.defaultProps = {
  title: '',
  titleHighlightColor: 'primary',
  marginBottom: null,
  withBackground: false,
};

export default Features;
