/* eslint-disable react/prop-types */
import { graphql } from 'gatsby';
import React from 'react';

import MainLayout from 'layouts/main';
import Content from 'components/pages/pricing/content';

const Pricing = ({
  data: {
    wpPage: { seo, acf: data },
  },
  pageContext,
}) => {
  const contentProps = {
    hero: data.heroPricing,
    faq: data.faq,
  };
  return (
    <MainLayout seo={seo} pageContext={pageContext}>
      <Content {...contentProps} />
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
        }
        faq {
          title
          description
        }
      }
      ...wpPageSeo
    }
  }
`;
