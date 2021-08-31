import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';

import InfoIcon from 'icons/info.inline.svg';

import styles from './tooltip.module.scss';

const cx = classNames.bind(styles);
const Tooltip = ({ className, text }) => {
  const [isTooltipVisible, setTooltipVisibility] = useState(false);
  useEffect(() => {
    setTooltipVisibility(true);
  }, []);
  return (
    <span className={cx('container', className)}>
      <span className={cx('opener')} data-tip={text}>
        <InfoIcon className={cx('icon')} />
      </span>
      {isTooltipVisible && (
        <ReactTooltip
          className={cx('inner')}
          place="right"
          delayHide={300}
          effect="solid"
          backgroundColor="#4F4554"
          multiline
        />
      )}
    </span>
  );
};
export default Tooltip;

Tooltip.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
};

Tooltip.defaultProps = {
  className: undefined,
};
