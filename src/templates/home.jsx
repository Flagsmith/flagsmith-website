/* eslint-disable react/prop-types */
import { graphql } from 'gatsby';
import React from 'react';

import ConfigureFeatures from 'components/pages/home/configure-features';
import FeatureFlags from 'components/pages/home/feature-flags';
import GetStarted from 'components/pages/home/get-started';
import Hero from 'components/pages/home/hero';
import Languages from 'components/pages/home/languages';
import Options from 'components/pages/home/options';
import Platform from 'components/pages/home/platform';
import RemoteConfig from 'components/pages/home/remote-config';
import MainLayout from 'layouts/main';

const Home = ({
  data: {
    wpPage: { seo, acf: data },
  },
  pageContext,
}) => {
  return (
    <MainLayout seo={seo} pageContext={pageContext}>
      <Hero {...data.hero} />
      <FeatureFlags {...data.section1} />
      <ConfigureFeatures />
      <RemoteConfig />
      <Platform />
      <Languages />
      <Options />
      <GetStarted />
    </MainLayout>
  );
};

export default Home;

export const query = graphql`
  query($id: String!) {
    wpPage(id: { eq: $id }) {
      acf {
        hero {
          title
          description
          button {
            url
            target
            title
          }
        }
        section1 {
          title
          description
          link {
            url
          }
        }
      }
      ...wpPageSeo
    }
  }
`;
