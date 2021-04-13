/* eslint-disable react/prop-types */
import { graphql } from 'gatsby';
import React from 'react';

import BlogPostsList from 'components/pages/blog/blog-posts-list';
import MainLayout from 'layouts/main';

const items = [
  {
    title: 'Deployment is not a release; a step-by-step example with feature flags',
    info: 'By Ben Rometsch on April 6th, 2021',
    description: 'Guide for using feature flags to decouple deployment and release',
    link: {
      url: '/',
      title: 'Read More',
    },
  },
  {
    title: 'Deployment is not a release; a step-by-step example with feature flags',
    info: 'By Ben Rometsch on April 6th, 2021',
    description: 'Guide for using feature flags to decouple deployment and release',
    link: {
      url: '/',
      title: 'Read More',
    },
  },
  {
    title: 'Deployment is not a release; a step-by-step example with feature flags',
    info: 'By Ben Rometsch on April 6th, 2021',
    description: 'Guide for using feature flags to decouple deployment and release',
    link: {
      url: '/',
      title: 'Read More',
    },
  },
  {
    title: 'The difference between feature flags and remote configuration',
    info: 'By Ben Rometsch on April 6th, 2021',
    description:
      'Exploring the difference between feature flags and remote config, and use cases for each',
    link: {
      url: '/',
      title: 'Read More',
    },
  },
];

const podcastCard = {
  title: 'Ruby on Rails, Basecamp & HEY',
  episode: '9',
  duration: '63:69',
  button: {
    url: '/',
    title: 'See all podcasts',
  },
};

const Blog = ({
  data: {
    wpPage: { seo, title, acf: data },
  },
  pageContext,
}) => (
  <MainLayout seo={seo} pageContext={pageContext}>
    <BlogPostsList
      pageTitle={title}
      featuredPost={data.featuredPost}
      items={items}
      podcastCard={podcastCard}
    />
  </MainLayout>
);

export default Blog;

export const query = graphql`
  query($id: String!) {
    wpPage(id: { eq: $id }) {
      title
      acf {
        featuredPost {
          post {
            ... on WpPost {
              title
              author {
                node {
                  firstName
                  lastName
                }
              }
              acf {
                description: shortDescription
              }
              date(formatString: "YYYY-MM-DD")
              url: uri
            }
          }
        }
      }
      ...wpPageSeo
    }
  }
`;
