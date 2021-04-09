import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import Heading from 'components/shared/heading/heading';

import illustrationType1 from './images/illustration-type-1.url.svg';
import illustrationType2 from './images/illustration-type-2.url.svg';
import styles from './rainbow-text.module.scss';

const cx = classNames.bind(styles);

const illustrations = {
  1: illustrationType1,
  2: illustrationType2,
};

const RainbowText = ({ text, type, withBackground, withMargins, marginBottom }) => {
  const illustration = illustrations[type];

  return (
    <div
      className={cx('wrapper', {
        'with-background': withBackground,
        primary: withBackground,
        withMargins,
        [`margin-bottom-${marginBottom}`]: marginBottom,
      })}
    >
      <div className="container">
        <Heading
          className={cx('text', `type_${type}`)}
          tag="p"
          size="xl"
          color="primary"
          highlightedWordsWithoutWrap={false}
          innerHTML={text}
        />
      </div>

      <img className={cx('illustration')} src={illustration} alt="" loading="lazy" aria-hidden />
    </div>
  );
};

RainbowText.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['1', '2']),
  withBackground: PropTypes.bool,
  withMargins: PropTypes.bool,
  marginBottom: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
};

RainbowText.defaultProps = {
  type: '1',
  withBackground: false,
  withMargins: false,
  marginBottom: null,
};

export default RainbowText;
