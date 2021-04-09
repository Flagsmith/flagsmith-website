import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import Link from 'components/shared/link';

import styles from './button.module.scss';

const cx = classNames.bind(styles);

const Button = (props) => {
  const {
    className: additionalClassName,
    to,
    theme,
    size,
    loading,
    disabled,
    children,
    ...otherProps
  } = props;

  const Tag = to ? Link : 'button';

  const className = cx(
    'wrapper',
    `theme-${theme}`,
    `size-${size}`,
    { loading },
    { disabled },
    additionalClassName
  );

  return (
    <Tag className={className} to={to} {...otherProps}>
      <span>{children}</span>
    </Tag>
  );
};

Button.defaultProps = {
  className: null,
  to: null,
  theme: 'primary',
  size: 'lg',
  loading: false,
  disabled: false,
};

Button.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string,
  theme: PropTypes.oneOf([
    'primary',
    'tertiary',
    'accent-primary',
    'accent-secondary',
    'accent-tertiary',
  ]),
  size: PropTypes.oneOf(['lg', 'md']),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Button;
