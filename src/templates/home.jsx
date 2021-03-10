/* eslint-disable react/prop-types */
import { graphql } from 'gatsby';
import React from 'react';

import ConfigureFeatures from 'components/pages/home/configure-features';
import FeatureFlags from 'components/pages/home/feature-flags';
import GetStarted from 'components/shared/get-started';
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
}) => (
  <MainLayout seo={seo} pageContext={pageContext}>
    <Hero {...data.hero} />
    <FeatureFlags {...data.section1} />
    <ConfigureFeatures title={data.section2} />
    <RemoteConfig {...data.section3} />
    <Platform {...data.platform} />
    <Languages {...data.languages} />
    <Options {...data.options} />
    <GetStarted />
  </MainLayout>
);

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
          codeLabel
          code
          logosTitle
          logos {
            altText
            localFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
          }
        }
        section1 {
          title
          description
          link {
            url
          }
        }
        section2
        section3 {
          title
          description
          link {
            url
          }
        }
        platform {
          title
          items {
            title
            description
            iconName
          }
        }
        languages {
          title
          description
          link {
            url
          }
          items {
            language
            code
            codeStyle
          }
        }
        options {
          title
          items {
            title
            link {
              url
            }
            theme
            imageName
            features {
              text
            }
          }
        }
      }
      ...wpPageSeo
    }
  }
`;
