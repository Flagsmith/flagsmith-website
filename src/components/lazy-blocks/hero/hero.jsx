import classNames from 'classnames/bind';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
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
  backgroundIllustration,
  marginBottom,
}) => {
  const { flagsIllustration, dronesIllustration } = useStaticQuery(graphql`
    query {
      flagsIllustration: file(relativePath: { eq: "lazy-blocks/hero/flags-illustration.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 1920, breakpoints: [414, 768, 1024, 1280, 1440, 1920, 2880, 3840])
        }
      }
      dronesIllustration: file(relativePath: { eq: "lazy-blocks/hero/drones-illustration.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 1920, breakpoints: [414, 768, 1024, 1280, 1440, 1920, 2880, 3840])
        }
      }
    }
  `);

  const backgroundIllustrations = {
    flags: flagsIllustration,
    drones: dronesIllustration,
  };

  const shouldRenderButtonsWrapper =
    (accentButtonText && accentButtonUrl) || (primaryButtonText && primaryButtonUrl);

  return (
    <section className={cx('wrapper', { [`margin-bottom-${marginBottom}`]: marginBottom })}>
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

      {backgroundIllustration && backgroundIllustrations[backgroundIllustration] && (
        <GatsbyImage
          className={cx('illustration')}
          image={getImage(backgroundIllustrations[backgroundIllustration])}
          alt=""
          aria-hidden
        />
      )}
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
  backgroundIllustration: PropTypes.oneOf(['flags', 'drones']),
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
  backgroundIllustration: null,
  marginBottom: null,
};

export default Hero;
