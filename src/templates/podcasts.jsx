/* eslint-disable react/prop-types */
import { graphql } from 'gatsby';
import React from 'react';

import Hero from 'components/pages/podcasts/hero';
import PodcastsList from 'components/pages/podcasts/podcasts-list';
import Subscribe from 'components/shared/subscribe';
import MainLayout from 'layouts/main';

const Podcasts = ({
  data: {
    wpPage: { seo, uri, acf: data },
    allWpPodcast: { nodes: podcasts },
  },
  pageContext,
}) => (
  <MainLayout seo={seo} pageContext={pageContext}>
    <Hero {...data.podcastsHero} />
    <PodcastsList podcasts={podcasts} rootPath={uri} />
    <Subscribe />
  </MainLayout>
);

export default Podcasts;

export const query = graphql`
  query($id: String!, $skip: Int!, $limit: Int!) {
    wpPage(id: { eq: $id }) {
      uri
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
          host {
            firstName
            lastName
            acf {
              avatar {
                localFile {
                  childImageSharp {
                    gatsbyImageData(width: 80)
                  }
                }
              }
            }
          }
        }
      }
      ...wpPageSeo
    }
    allWpPodcast(sort: { fields: date, order: DESC }, limit: $limit, skip: $skip) {
      nodes {
        tags {
          nodes {
            name
          }
        }
        title
        acf {
          episode
          podcastUrl
          description
          blogPost {
            ... on WpPost {
              title
              author {
                node {
                  firstName
                  lastName
                }
              }
              date(formatString: "YYYY-MM-DD")
              acf {
                description: shortDescription
              }
              url: uri
            }
          }
        }
        url: uri
      }
    }
  }
`;
