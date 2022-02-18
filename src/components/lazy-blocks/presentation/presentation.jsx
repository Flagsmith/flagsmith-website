import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';
import { useInView } from 'react-intersection-observer';

import Button from 'components/shared/button';
import FeatureFlagsIllustration from 'components/shared/feature-flags-illustration';
import Heading from 'components/shared/heading';
import Link from 'components/shared/link';
import RemoteConfigIllustration from 'components/shared/remote-config-illustration';

import Ab from './images/ab.inline.svg';
import Checkbox from './images/checkbox.inline.svg';
import Diagrams from './images/diagrams.inline.svg';
import Flag from './images/flag.inline.svg';
import List from './images/list.inline.svg';
import Settings from './images/settings.inline.svg';
import shape from './images/shape.svg';
import styles from './presentation.module.scss';

const cx = classNames.bind(styles);

const htmlIllustrations = {
  featureFlags: FeatureFlagsIllustration,
  remoteConfig: RemoteConfigIllustration,
};

const featuresIcons = {
  ab: Ab,
  checkbox: Checkbox,
  diagrams: Diagrams,
  flag: Flag,
  list: List,
  settings: Settings,
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
  features,
}) => {
  const [animationContainer, animationContainerView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const shouldRenderButtonsWrapper =
    (accentButtonText && accentButtonUrl) || (primaryButtonText && primaryButtonUrl);

  const HTMLIllustration = htmlIllustrations[htmlIllustration];

  const withHTMLIllustration = htmlIllustration && HTMLIllustration;

  let imgPlaceholderData;

  if (image) {
    imgPlaceholderData = `data:image/svg+xml;charset=utf-8,%3Csvg height='${
      image.height / 2
    }' width='${image.width / 2}' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E`;
  }
  console.log(features);

  return (
    <section
      className={cx('wrapper', {
        'with-background': withBackground,
        primary: withBackground,
        [`margin-bottom-${marginBottom}`]: marginBottom,
      })}
    >
      <div className={cx('container')}>
        <div className={cx('inner', 'botton-border', alignment)}>
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
            {image && !withHTMLIllustration && (
              <div className={cx('image-wrapper')}>
                <div className={cx('image-inner')}>
                  <div style={{ maxWidth: image.width / 2, display: 'block' }}>
                    <img
                      src={imgPlaceholderData}
                      alt=""
                      style={{ maxWidth: '100%', display: 'block', position: 'static' }}
                      aria-hidden
                    />
                  </div>
                  <img
                    className={cx('image')}
                    loading="lazy"
                    srcSet={image.srcset}
                    alt=""
                    aria-hidden
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {features && features.length > 0 && features[0].text && features[0].title && (
          <div className={cx('features')}>
            {features.map(({ iconName, title, text }, index) => {
              const Icon = featuresIcons[iconName];
              return (
                <div key={index}>
                  {Icon && <Icon className={cx('feature-image')} aria-hidden />}
                  <h3 className={cx('feature-title')}>{title}</h3>
                  <p className={cx('feature-text')}>{text}</p>
                </div>
              );
            })}
          </div>
        )}
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
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    srcset: PropTypes.string.isRequired,
  }),
  htmlIllustration: PropTypes.oneOf(Object.keys(htmlIllustrations)),
  withBackground: PropTypes.bool,
  alignment: PropTypes.oneOf(['left', 'right']),
  marginBottom: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
  features: PropTypes.arrayOf(
    PropTypes.shape({
      iconName: PropTypes.oneOf(Object.keys(featuresIcons)).isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
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
  features: null,
};

export default Presentation;
