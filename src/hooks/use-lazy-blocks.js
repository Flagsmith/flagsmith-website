/* eslint-disable no-case-declarations */
import parse, { attributesToProps } from 'html-react-parser';
import isBoolean from 'lodash.isboolean';
import isEmpty from 'lodash.isempty';
import React from 'react';

import AdvantagesDisadvantages from 'components/lazy-blocks/advantages-disadvantages';
import Cards from 'components/lazy-blocks/cards';
import Features from 'components/lazy-blocks/features';
import Flags from 'components/lazy-blocks/flags';
import GetStartedWithQuote from 'components/lazy-blocks/get-started-with-quote';
import Hero from 'components/lazy-blocks/hero';
import Logos from 'components/lazy-blocks/logos';
import Presentation from 'components/lazy-blocks/presentation';
import PresentationWithoutIllustration from 'components/lazy-blocks/presentation-without-illustration';
import QuotationCarousel from 'components/lazy-blocks/quotation-carousel';
import ContactForm from 'components/shared/contact-form';
import FAQ from 'components/shared/faq';
import GetStarted from 'components/shared/get-started';
import RainbowText from 'components/shared/rainbow-text';

function isBooleanString(string) {
  return string === 'true' || string === 'false';
}

function isJSON(string) {
  if (typeof string !== 'string') return false;
  if (isBooleanString(string)) return false;

  try {
    JSON.parse(string);
  } catch (error) {
    return false;
  }

  return true;
}

function toCamelCase(string) {
  return string.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace('-', '').replace('_', '')
  );
}

function transformValue(value) {
  if (isJSON(value)) {
    const parsedJSON = JSON.parse(value);

    if (Array.isArray(parsedJSON)) return parsedJSON.map((item) => transformProps(item));
    if (typeof parsedJSON === 'object' && parsedJSON !== null) return transformProps(parsedJSON);

    return parsedJSON;
  }

  if (Array.isArray(value)) return value.map((item) => transformProps(item));
  if (typeof value === 'object' && value !== null) return transformProps(value);

  if (isBooleanString(value)) return value === 'true';

  return value;
}

function transformProps(props) {
  const transformedProps = {};

  Object.keys(props).forEach((propName) => {
    const transformedValue = transformValue(props[propName]);
    if (!transformedValue && isEmpty(transformedValue) && !isBoolean(transformedValue)) return;
    transformedProps[toCamelCase(propName)] = transformedValue;
  });

  return transformedProps;
}

const components = {
  cards: Cards,
  features: Features,
  flags: Flags,
  hero: Hero,
  logos: Logos,
  faq: FAQ,
  getstartedwithquote: GetStartedWithQuote,
  advantagesdisadvantages: AdvantagesDisadvantages,
  presentation: Presentation,
  presentationwithoutillustration: PresentationWithoutIllustration,
  quotationcarousel: QuotationCarousel,
  contactform: ContactForm,
  getstarted: GetStarted,
  rainbowtext: RainbowText,
};

export const useLazyBlocks = (content) => {
  // https://github.com/remarkablemark/html-react-parser#htmlparser2
  // The library does parsing on client side differently from server side
  // it results in having a need of passing htmlparser2 to adjust behavior
  // according to the client side behavior
  const reactedContent = parse(content, {
    htmlparser2: {
      lowerCaseAttributeNames: true,
    },
    replace: (domNode) => {
      if (domNode.type === 'tag') {
        const Component = components[domNode.name];

        if (!Component) return null;

        const props = transformProps(attributesToProps(domNode.attribs));

        return <Component {...props} />;
      }
    },
  });

  return { reactedContent };
};
