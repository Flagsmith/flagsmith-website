/* eslint-disable react/prop-types */
import { graphql } from 'gatsby';
import React from 'react';

import Hero from 'components/pages/podcasts/hero';
import PodcastsList from 'components/pages/podcasts/podcasts-list';
import MainLayout from 'layouts/main';

const Podcasts = ({
  data: {
    wpPage: { seo, acf: data },
    allWpPodcast: { nodes: podcasts },
  },
  pageContext,
}) => (
  <MainLayout seo={seo} pageContext={pageContext}>
    <Hero {...data.podcastsHero} />
    <PodcastsList podcasts={podcasts} />
  </MainLayout>
);

export default Podcasts;

export const query = graphql`
  query($id: String!) {
    wpPage(id: { eq: $id }) {
      acf {
        podcastsHero {
          title
          text
          description
          buttons {
            buttonIcon
            button {
              url
              title
              target
            }
          }
        }
      }
      ...wpPageSeo
    }
    allWpPodcast(sort: { fields: date, order: DESC }) {
      nodes {
        title
        content
        excerpt
        url: uri
      }
    }
  }
`;
