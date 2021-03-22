/* eslint-disable react/prop-types */
import { graphql } from 'gatsby';
import React from 'react';

import Hero from 'components/pages/pricing/hero';
import FAQ from 'components/pages/pricing/faq';
import GetStarted from 'components/shared/get-started';

import MainLayout from 'layouts/main';

const Pricing = ({
  data: {
    wpPage: { seo, acf: data },
  },
  pageContext,
}) => (
  <MainLayout seo={seo} pageContext={pageContext}>
    <Hero {...data.heroPricing} />
    <FAQ items={data.faq} />
    <GetStarted />
  </MainLayout>
);

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
