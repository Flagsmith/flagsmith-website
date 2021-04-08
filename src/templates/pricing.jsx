/* eslint-disable react/prop-types */
import { graphql } from 'gatsby';
import React from 'react';

import Content from 'components/pages/pricing/content';
import MainLayout from 'layouts/main';

const Pricing = ({
  data: {
    wpPage: { seo, acf: data },
    wpSharedBlock: { getStarted },
  },
  pageContext,
}) => {
  const contentProps = {
    hero: data.heroPricing,
    faq: data.faq,
  };
  const getStartedProps = {
    title: getStarted.title,
    description: getStarted.description,
    buttonText: getStarted.button.title,
    buttonUrl: getStarted.button.url,
  };
  return (
    <MainLayout seo={seo} pageContext={pageContext}>
      <Content {...contentProps} getStartedProps={getStartedProps} />
    </MainLayout>
  );
};

export default Pricing;

export const query = graphql`
  query($id: String!) {
    wpPage(id: { eq: $id }) {
      acf {
        heroPricing {
          title
          description
          prices {
            title
            description
            price
            priceLabel
            imageName
            button {
              title
              url
              target
            }
            features {
              text
              enable
            }
            theme
          }
          options {
            title
            imageName
            features {
              text
            }
          }
        }
        faq {
          title
          description
        }
      }
      ...wpPageSeo
    }
    wpSharedBlock(slug: { eq: "get-started" }) {
      getStarted: acf {
        title
        description
        button {
          title
          url
        }
      }
    }
  }
`;
