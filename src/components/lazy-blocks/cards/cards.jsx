import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import Heading from 'components/shared/heading';
import Link from 'components/shared/link';
import Arrow from 'icons/arrow-right.inline.svg';

import styles from './cards.module.scss';

const cx = classNames.bind(styles);

const Cards = (props) => {
  const {
    title,
    titleHighlightColor,
    description,
    isBlankTarget,
    items,
    withBackground,
    marginBottom,
  } = props;
  const onlyLogo = items.every(({ text }) => !text);

  return (
    <section
      className={cx('wrapper', {
        'with-background': withBackground,
        primary: withBackground,
        [`margin-bottom-${marginBottom}`]: marginBottom,
      })}
    >
      <div className="container">
        {(title || description) && (
          <div className={cx('header')}>
            {title && (
              <Heading
                className={cx('title')}
                tag="h2"
                size="lg"
                highlightedWordsColor={titleHighlightColor}
                innerHTML={title}
                highlightedWordsWithoutWrap={false}
              />
            )}
            {description && (
              <p className={cx('description')} dangerouslySetInnerHTML={{ __html: description }} />
            )}
          </div>
        )}
        <ul className={cx('items-wrapper', { withText: !onlyLogo, onlyLogo })}>
          {items.map(({ logo, text, url }, index) => {
            const Tag = url ? Link : 'div';
            const target = isBlankTarget && url ? '_blank' : null;
            return (
              <li className={cx('item')} key={index}>
                <Tag className={cx('item-inner')} to={url || null} target={target}>
                  <img className={cx('logo')} loading="lazy" src={logo.url} alt={logo.alt} />
                  {!onlyLogo && (
                    <>
                      <p className={cx('text')}>{text}</p>
                      <span className={cx('learn-more')}>
                        Learn more
                        <Arrow />
                      </span>
                    </>
                  )}
                </Tag>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

Cards.propTypes = {
  title: PropTypes.string,
  titleHighlightColor: PropTypes.oneOf(['primary', 'secondary']),
  description: PropTypes.string,
  isBlankTarget: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      logo: PropTypes.shape({
        url: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
      }).isRequired,
      text: PropTypes.string,
      url: PropTypes.string,
    })
  ).isRequired,
  withBackground: PropTypes.bool,
  marginBottom: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
};

Cards.defaultProps = {
  title: '',
  titleHighlightColor: 'primary',
  description: '',
  isBlankTarget: false,
  withBackground: false,
  marginBottom: null,
};

export default Cards;
