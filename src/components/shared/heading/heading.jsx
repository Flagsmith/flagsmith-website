import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './heading.module.scss';

const cx = classNames.bind(styles);

const Heading = (props) => {
  const {
    className: additionalClassName,
    tag: Tag,
    size,
    color,
    highlightedWordsColor,
    innerHTML,
    children,
    highlightedWordsWithoutWrap,
    ...otherProps
  } = props;

  const className = cx(
    'wrapper',
    `size-${size}`,
    `color-${color}`,
    `highlighted-words-color-${highlightedWordsColor}`,
    { 'highlighted-words-no-wrap': highlightedWordsWithoutWrap },
    additionalClassName
  );

  if (innerHTML) {
    return (
      <Tag className={className} dangerouslySetInnerHTML={{ __html: innerHTML }} {...otherProps} />
    );
  }

  return (
    <Tag className={className} {...otherProps}>
      {children}
    </Tag>
  );
};

Heading.propTypes = {
  className: PropTypes.string,
  tag: PropTypes.string,
  size: PropTypes.oneOf(['xxl', 'xl', 'lg', 'md']),
  color: PropTypes.oneOf(['primary', 'tertiary', 'quaternary']),
  highlightedWordsColor: PropTypes.oneOf(['primary', 'secondary']),
  innerHTML: PropTypes.string,
  children: PropTypes.node,
  highlightedWordsWithoutWrap: PropTypes.bool,
};

Heading.defaultProps = {
  className: null,
  tag: 'h1',
  size: 'xxl',
  color: 'primary',
  highlightedWordsColor: 'primary',
  innerHTML: '',
  children: null,
  highlightedWordsWithoutWrap: true,
};

export default Heading;
