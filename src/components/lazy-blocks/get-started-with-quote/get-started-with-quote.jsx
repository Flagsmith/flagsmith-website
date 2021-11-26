import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import Button from 'components/shared/button/button';
import Heading from 'components/shared/heading/heading';

import styles from './get-started-with-quote.module.scss';
import illustration from './images/illustration.url.svg';
import Quote from './images/quote.inline.svg';
import Shape1 from './images/shape-1.inline.svg';
import Shape2 from './images/shape-2.inline.svg';

const cx = classNames.bind(styles);

const GetStartedWithQuote = (props) => {
  const {
    quoteText,
    authorImage,
    authorName,
    authorCompany,
    title,
    buttonText,
    buttonUrl,
    marginBottom,
  } = props;

  return (
    <section className={cx('wrapper', { [`margin-bottom-${marginBottom}`]: marginBottom })}>
      <div className="container">
        <div className={cx('inner')}>
          <div className={cx('content')}>
            <div className={cx('left')}>
              <Quote className={cx('quote')} aria-hidden />
              <figure className={cx('item')}>
                <blockquote
                  className={cx('text')}
                  dangerouslySetInnerHTML={{ __html: quoteText }}
                />
                <figcaption className={cx('author')}>
                  {authorImage && (
                    <img
                      className={cx('author-image')}
                      src={authorImage}
                      loading="lazy"
                      alt=""
                      aria-hidden
                    />
                  )}
                  <div>
                    <span className={cx('author-name')}>{authorName}</span>
                    <span className={cx('author-company')}>{authorCompany}</span>
                  </div>
                </figcaption>
              </figure>
            </div>

            <div className={cx('right')}>
              <div className={cx('right-content')}>
                <Heading className={cx('title')} tag="h2">
                  {title}
                </Heading>
                <Button className={cx('button')} to={buttonUrl}>
                  {buttonText}
                </Button>
              </div>
              <Shape1 className={cx('shape-1')} />
              <Shape2 className={cx('shape-2')} />
              <img
                className={cx('illustration')}
                src={illustration}
                alt=""
                loading="lazy"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

GetStartedWithQuote.propTypes = {
  quoteText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authorImage: PropTypes.string,
  authorName: PropTypes.string.isRequired,
  authorCompany: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonUrl: PropTypes.string.isRequired,
  marginBottom: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
};

GetStartedWithQuote.defaultProps = {
  authorImage: null,
  marginBottom: null,
};

export default GetStartedWithQuote;
