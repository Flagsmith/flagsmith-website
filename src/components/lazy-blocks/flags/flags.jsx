import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import Heading from 'components/shared/heading';

import styles from './flags.module.scss';

const cx = classNames.bind(styles);

const Flags = ({ title, titleHighlightColor, items, withBackground, marginBottom }) => (
  <section
    className={cx('wrapper', {
      'with-background': withBackground,
      primary: withBackground,
      [`margin-bottom-${marginBottom}`]: marginBottom,
    })}
  >
    <div className={cx('container')}>
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
      <ul className={cx('items-wrapper')}>
        {items.map(({ icon, text }, index) => (
          <li key={index}>
            <img className={cx('logo')} src={icon.url} alt={icon.alt} />
            {text && (
              <Heading tag="h3" size="md" color="quaternary">
                {text}
              </Heading>
            )}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

Flags.propTypes = {
  title: PropTypes.string,
  titleHighlightColor: PropTypes.oneOf(['primary', 'secondary']),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.shape({
        url: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
      }).isRequired,
      text: PropTypes.string,
    })
  ).isRequired,
  withBackground: PropTypes.bool,
  marginBottom: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
};

Flags.defaultProps = {
  title: '',
  titleHighlightColor: false,
  withBackground: false,
  marginBottom: null,
};

export default Flags;
