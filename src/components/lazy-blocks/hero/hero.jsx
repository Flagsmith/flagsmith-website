import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';
import GitHubButton from 'react-github-btn';

import Button from 'components/shared/button';
import Heading from 'components/shared/heading';

import styles from './hero.module.scss';

const cx = classNames.bind(styles);

const Hero = ({
  title,
  titleHighlightColor,
  description,
  accentButtonText,
  accentButtonUrl,
  primaryButtonText,
  primaryButtonUrl,
  showGithubStarButton,
  withBackground,
  marginBottom,
}) => {
  const shouldRenderButtonsWrapper =
    (accentButtonText && accentButtonUrl) || (primaryButtonText && primaryButtonUrl);

  return (
    <section
      className={cx('wrapper', { withBackground, [`margin-bottom-${marginBottom}`]: marginBottom })}
    >
      <div className={cx('container', 'inner')}>
        <Heading
          className={cx('title')}
          tag="h1"
          size="xxl"
          highlightedWordsColor={titleHighlightColor}
          innerHTML={title}
          highlightedWordsWithoutWrap={false}
        />
        {description && (
          <p className={cx('description')} dangerouslySetInnerHTML={{ __html: description }} />
        )}
        {shouldRenderButtonsWrapper && (
          <div className={cx('buttons-wrapper')}>
            {accentButtonText && accentButtonUrl && (
              <Button className={cx('button')} theme="accent-primary" to={accentButtonUrl}>
                {accentButtonText}
              </Button>
            )}
            {primaryButtonText && primaryButtonUrl && (
              <Button className={cx('button')} theme="primary" to={primaryButtonUrl}>
                {primaryButtonText}
              </Button>
            )}
          </div>
        )}
        {showGithubStarButton && (
          <div className={cx('github-button-wrapper')}>
            <GitHubButton
              href="https://github.com/Flagsmith/flagsmith-api"
              data-icon="octicon-star"
              data-size="large"
              data-show-count="true"
              aria-label="Star Flagsmith/flagsmith-api on GitHub"
              style={{ display: 'block' }}
            >
              Star
            </GitHubButton>
          </div>
        )}
      </div>
    </section>
  );
};

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  titleHighlightColor: PropTypes.oneOf(['primary', 'secondary']),
  description: PropTypes.string,
  accentButtonText: PropTypes.string,
  accentButtonUrl: PropTypes.string,
  primaryButtonText: PropTypes.string,
  primaryButtonUrl: PropTypes.string,
  showGithubStarButton: PropTypes.bool,
  withBackground: PropTypes.bool,
  marginBottom: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
};

Hero.defaultProps = {
  titleHighlightColor: 'primary',
  description: '',
  accentButtonText: '',
  accentButtonUrl: '',
  primaryButtonText: '',
  primaryButtonUrl: '',
  showGithubStarButton: false,
  withBackground: false,
  marginBottom: null,
};

export default Hero;
