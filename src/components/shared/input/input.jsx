import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './input.module.scss';

const cx = classNames.bind(styles);

const Input = React.forwardRef((props, ref) => {
  const { className: additionalClassName, tag: Tag, type, error, ...otherProps } = props;

  const classNameError = cx({
    invalid: error,
  });

  const innerClassName = cx('input-inner', classNameError, additionalClassName);

  return (
    <div className={cx('input')}>
      <Tag className={innerClassName} type={type} {...otherProps} ref={ref} />
      {error && <span className={cx('input-error')}>{error}</span>}
    </div>
  );
});

Input.defaultProps = {
  className: null,
  tag: 'input',
  type: 'text',
  error: null,
};

Input.propTypes = {
  className: PropTypes.string,
  tag: PropTypes.oneOf(['input', 'textarea']),
  type: PropTypes.string,
  error: PropTypes.string,
};

export default Input;
