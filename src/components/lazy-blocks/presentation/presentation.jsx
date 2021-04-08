import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import Button from 'components/shared/button';
import FeatureFlagsIllustration from 'components/shared/feature-flags-illustration';
import Heading from 'components/shared/heading';
import Link from 'components/shared/link';

import shape from './images/shape.svg';
import styles from './presentation.module.scss';

const cx = classNames.bind(styles);

const htmlIllustrations = {
  featureFlags: FeatureFlagsIllustration,
};

const Presentation = ({
  icon,
  title,
  titleHighlightColor,
  content,
  linkText,
  linkUrl,
  accentButtonText,
  accentButtonUrl,
  primaryButtonText,
  primaryButtonUrl,
  image,
  htmlIllustration,
  withBackground,
  alignment,
  marginBottom,
}) => {
  const [animationContainer, animationContainerView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const [imageWidth, setImageWidth] = useState(null);
  const imageRef = useRef(null);

  const shouldRenderButtonsWrapper =
    (accentButtonText && accentButtonUrl) || (primaryButtonText && primaryButtonUrl);

  const HTMLIllustration = htmlIllustrations[htmlIllustration];

  const withHTMLIllustration = htmlIllustration && HTMLIllustration;

  useEffect(() => {
    if (imageRef?.current) {
      if (imageRef?.current?.complete) {
        const image = imageRef.current;
        const isSVG = image.src.endsWith('.svg');
        setImageWidth(isSVG ? image.naturalWidth : image.naturalWidth / 2);
      } else {
        imageRef?.current?.addEventListener('load', (event) => {
          const image = event.currentTarget;
          const isSVG = image.src.endsWith('.svg');
          setImageWidth(isSVG ? image.naturalWidth : image.naturalWidth / 2);
        });
      }
    }
  }, [imageRef?.current?.src, imageRef?.current?.complete, imageRef?.current?.naturalWidth]);

  return (
    <section
      className={cx('wrapper', {
        'with-background': withBackground,
        primary: withBackground,
        [`margin-bottom-${marginBottom}`]: marginBottom,
      })}
    >
      <div className={cx('container', 'inner', alignment)}>
        <div className={cx('content-wrapper')}>
          {icon && <img className={cx('icon')} src={icon.url} alt="" aria-hidden />}
          <Heading
            className={cx('title')}
            tag="h2"
            size="xl"
            highlightedWordsColor={titleHighlightColor}
            innerHTML={title}
            highlightedWordsWithoutWrap={false}
          />
          <div className={cx('content')} dangerouslySetInnerHTML={{ __html: content }} />
          {linkText && linkUrl && (
            <Link className={cx('link')} to={linkUrl} withArrow>
              {linkText}
            </Link>
          )}
          {shouldRenderButtonsWrapper && (
            <div className={cx('buttons-wrapper')}>
              {accentButtonUrl && accentButtonText && (
                <Button className={cx('button')} theme="accent-primary" to={accentButtonUrl}>
                  {accentButtonText}
                </Button>
              )}
              {primaryButtonUrl && primaryButtonText && (
                <Button className={cx('button')} theme="primary" to={primaryButtonUrl}>
                  {primaryButtonText}
                </Button>
              )}
            </div>
          )}
        </div>

        <div
          className={cx('illustration-wrapper')}
          ref={withHTMLIllustration ? animationContainer : null}
        >
          {withHTMLIllustration && (
            <HTMLIllustration className={cx('illustration')} animate={animationContainerView} />
          )}
          {withHTMLIllustration && withBackground && (
            <img className={cx('shape')} loading="lazy" src={shape} alt="" aria-hidden />
          )}
          {image && (
            <img
              className={cx('image')}
              width={imageWidth}
              loading="lazy"
              src={image.url}
              ref={imageRef}
              alt=""
              aria-hidden
            />
          )}
        </div>
      </div>
    </section>
  );
};

Presentation.propTypes = {
  icon: PropTypes.shape({
    url: PropTypes.string,
  }),
  title: PropTypes.string.isRequired,
  titleHighlightColor: PropTypes.oneOf(['primary', 'secondary']),
  content: PropTypes.string.isRequired,
  linkText: PropTypes.string,
  linkUrl: PropTypes.string,
  accentButtonText: PropTypes.string,
  accentButtonUrl: PropTypes.string,
  primaryButtonText: PropTypes.string,
  primaryButtonUrl: PropTypes.string,
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }),
  htmlIllustration: PropTypes.oneOf(Object.keys(htmlIllustrations)),
  withBackground: PropTypes.bool,
  alignment: PropTypes.oneOf(['left', 'right']),
  marginBottom: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
};

Presentation.defaultProps = {
  icon: null,
  titleHighlightColor: 'primary',
  linkText: '',
  linkUrl: '',
  accentButtonText: '',
  accentButtonUrl: '',
  primaryButtonText: '',
  primaryButtonUrl: '',
  image: null,
  htmlIllustration: null,
  withBackground: false,
  alignment: 'left',
  marginBottom: null,
};

export default Presentation;
