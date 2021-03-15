import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import IconArrowRight from 'icons/arrow-right.inline.svg';

import styles from './link.module.scss';

const cx = classNames.bind(styles);

const Link = ({ to, withArrow, children, className: additionalClassName, ...props }) => {
  const classNames = cx({ withArrow }, additionalClassName);

  // data-with-arrow serves to define styles in mixin => with-link
  if (to.startsWith('/')) {
    return (
      <GatsbyLink className={classNames} to={to} data-with-arrow={withArrow} {...props}>
        {children} {withArrow && <IconArrowRight />}
      </GatsbyLink>
    );
  }

  return (
    <a className={classNames} href={to} data-with-arrow={withArrow} {...props}>
      {children} {withArrow && <IconArrowRight />}
    </a>
  );
};

Link.defaultProps = {
  withArrow: false,
};

Link.propTypes = {
  to: PropTypes.string.isRequired,
  withArrow: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Link;
