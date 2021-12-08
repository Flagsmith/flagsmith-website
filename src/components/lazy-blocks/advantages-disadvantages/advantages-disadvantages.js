import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import Heading from 'components/shared/heading';

import styles from './advantages-disadvantages.module.scss';
import CheckIcon from './images/check.inline.svg';
import UncheckIcon from './images/uncheck.inline.svg';

const cx = classNames.bind(styles);

const AdvantagesDisadvantages = ({
  title,
  columnfirstlogo,
  columnsecondlogo,
  items,
  marginBottom,
}) => (
  <section
    className={cx('wrapper', {
      [`margin-bottom-${marginBottom}`]: marginBottom,
    })}
  >
    <Heading className={cx('title')} size="xl" tag="h2">
      {title}
    </Heading>

    <div className={cx('inner')}>
      <div className={cx('wrapper-content')}>
        <div className={cx('content', { 'without-logos': !columnfirstlogo && !columnsecondlogo })}>
          {columnfirstlogo && columnsecondlogo && (
            <div className={cx('list')}>
              <div />
              <div className={cx('icon-wrapper')}>
                <img src={columnfirstlogo} alt="" loading="lazy" aria-hidden />
              </div>
              <div className={cx('icon-wrapper')}>
                <img src={columnsecondlogo} alt="" loading="lazy" aria-hidden />
              </div>
            </div>
          )}

          {items.map(({ text, columnFirstIsChecked, columnSecondIsChecked }, index) => (
            <div className={cx('list')} key={index}>
              <div>
                <Heading className={cx('item-title')} tag="h4" size="base" innerHTML={text} />
              </div>
              <div className={cx('icon-wrapper')}>
                {columnFirstIsChecked ? <CheckIcon /> : <UncheckIcon />}
              </div>
              <div className={cx('icon-wrapper')}>
                {columnSecondIsChecked ? <CheckIcon /> : <UncheckIcon />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

AdvantagesDisadvantages.propTypes = {
  title: PropTypes.string.isRequired,
  columnfirstlogo: PropTypes.string,
  columnsecondlogo: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      logo: PropTypes.shape({
        url: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
      }).isRequired,
      text: PropTypes.string,
      columnFirstIsChecked: PropTypes.bool,
      columnSecondIsChecked: PropTypes.bool,
    })
  ).isRequired,

  marginBottom: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
};

AdvantagesDisadvantages.defaultProps = {
  columnfirstlogo: null,
  columnsecondlogo: null,
  marginBottom: null,
};

export default AdvantagesDisadvantages;
