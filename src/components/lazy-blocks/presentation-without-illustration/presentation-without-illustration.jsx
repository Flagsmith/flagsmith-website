import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import Button from 'components/shared/button';
import Heading from 'components/shared/heading';
import Link from 'components/shared/link';

import styles from './presentation-without-illustration.module.scss';

const cx = classNames.bind(styles);

const PresentationWithoutIllustration = ({
  title,
  titleHighlightColor,
  content,
  linkText,
  linkUrl,
  accentButtonText,
  accentButtonUrl,
  primaryButtonText,
  primaryButtonUrl,
  withBackground,
  marginBottom,
}) => {
  const shouldRenderButtonsWrapper =
    (accentButtonText && accentButtonUrl) || (primaryButtonText && primaryButtonUrl);

  return (
    <section
      className={cx('wrapper', {
        'with-background': withBackground,
        primary: withBackground,
        [`margin-bottom-${marginBottom}`]: marginBottom,
      })}
    >
      <div className={cx('container', 'inner')}>
        <Heading
          className={cx('title')}
          tag="h2"
          size="xl"
          highlightedWordsColor={titleHighlightColor}
          innerHTML={title}
          highlightedWordsWithoutWrap={false}
        />
        <div className={cx('content-wrapper')}>
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
      </div>
    </section>
  );
};

PresentationWithoutIllustration.propTypes = {
  title: PropTypes.string.isRequired,
  titleHighlightColor: PropTypes.oneOf(['primary', 'secondary']),
  content: PropTypes.string.isRequired,
  linkText: PropTypes.string,
  linkUrl: PropTypes.string,
  accentButtonText: PropTypes.string,
  accentButtonUrl: PropTypes.string,
  primaryButtonText: PropTypes.string,
  primaryButtonUrl: PropTypes.string,
  withBackground: PropTypes.bool,
  marginBottom: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
};

PresentationWithoutIllustration.defaultProps = {
  titleHighlightColor: 'primary',
  linkText: '',
  linkUrl: '',
  accentButtonText: '',
  accentButtonUrl: '',
  primaryButtonText: '',
  primaryButtonUrl: '',
  withBackground: false,
  marginBottom: null,
};

export default PresentationWithoutIllustration;
