import classNames from 'classnames/bind';
import { Link as GatsbyLink } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import IconArrowRight from 'icons/arrow-right.inline.svg';

import styles from './link.module.scss';

const cx = classNames.bind(styles);

const Link = ({ className: additionalClassName, to, withArrow, children, ...props }) => {
  const classNames = cx({ withArrow }, additionalClassName);

  const link = to.replace(process.env.GATSBY_WP_URL, '');

  const content = (
    <>
      {children} {withArrow && <IconArrowRight />}
    </>
  );

  // data-with-arrow serves to define styles in mixin => with-link
  if (link.startsWith('/')) {
    return (
      <GatsbyLink className={classNames} to={link} data-with-arrow={withArrow} {...props}>
        {content}
      </GatsbyLink>
    );
  }

  return (
    <a className={classNames} href={link} data-with-arrow={withArrow} {...props}>
      {content}
    </a>
  );
};

Link.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string.isRequired,
  withArrow: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Link.defaultProps = {
  className: '',
  withArrow: false,
};

export default Link;
