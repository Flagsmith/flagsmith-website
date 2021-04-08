import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.scss';
import 'swiper/components/a11y/a11y.scss';

import Arrow from './images/arrow.inline.svg';
import Quote from './images/quote.inline.svg';
import styles from './quotation-carousel.module.scss';

const cx = classNames.bind(styles);

SwiperCore.use([Navigation, Pagination, A11y]);

const QuotationCarousel = ({ items, withBackground, marginBottom }) => {
  const paginationRef = useRef(null);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const [showSwiper, setShowSwiper] = useState(false);

  useEffect(() => {
    setShowSwiper(paginationRef.current && prevButtonRef.current && nextButtonRef.current);
  }, [paginationRef, prevButtonRef, nextButtonRef]);

  return (
    <div
      className={cx('wrapper', {
        'with-background': withBackground,
        primary: withBackground,
        [`margin-bottom-${marginBottom}`]: marginBottom,
      })}
    >
      <div className="container">
        <Quote className={cx('quote')} aria-hidden />
        <div className={cx('slider-wrapper')}>
          <button
            className={cx('button')}
            type="button"
            aria-label="Previous slide"
            ref={prevButtonRef}
          >
            <Arrow className={cx('arrow')} />
          </button>
          {showSwiper && (
            <Swiper
              className={cx('items-wrapper')}
              pagination={{
                el: paginationRef.current,
                bulletClass: cx('bullet'),
                bulletActiveClass: cx('active'),
                clickable: true,
              }}
              navigation={{
                prevEl: prevButtonRef.current,
                nextEl: nextButtonRef.current,
              }}
              breakpoints={{
                768: { autoHeight: false },
              }}
              slidesPerView={1}
              loop
              autoHeight
            >
              {items.map(({ text, author }, index) => (
                <SwiperSlide key={index}>
                  <figure className={cx('item')}>
                    <blockquote className={cx('text')} dangerouslySetInnerHTML={{ __html: text }} />
                    <figcaption className={cx('author')}>{author}</figcaption>
                  </figure>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          <button
            className={cx('button')}
            type="button"
            aria-label="Next slide"
            ref={nextButtonRef}
          >
            <Arrow className={cx('arrow', 'flipped')} />
          </button>
          <div className="swiper-pagination" ref={paginationRef} />
        </div>
      </div>
    </div>
  );
};
QuotationCarousel.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      author: PropTypes.string,
    })
  ).isRequired,
  withBackground: PropTypes.bool,
  marginBottom: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
};

QuotationCarousel.defaultProps = {
  withBackground: false,
  marginBottom: null,
};

export default QuotationCarousel;
