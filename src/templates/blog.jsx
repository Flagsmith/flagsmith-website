/* eslint-disable react/prop-types */
import { graphql } from 'gatsby';
import React from 'react';

import BlogPostsList from 'components/pages/blog/blog-posts-list';
import MainLayout from 'layouts/main';

const Blog = ({
  data: {
    wpPage: { seo, title, uri, acf: data },
    allWpPost: { nodes: posts },
  },
  pageContext,
}) => (
  <MainLayout seo={seo} pageContext={pageContext}>
    <BlogPostsList
      pageTitle={title}
      featuredPost={data.featuredPost}
      posts={posts}
      rootPath={uri}
    />
  </MainLayout>
);

export default Blog;

export const query = graphql`
  query($id: String!, $featuredPostId: String!, $skip: Int!, $limit: Int!) {
    wpPage(id: { eq: $id }) {
      title
      uri
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
    allWpPost(
      filter: { id: { ne: $featuredPostId } }
      sort: { fields: date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        featuredImage {
          node {
            localFile {
              childImageSharp {
                gatsbyImageData(width: 330)
              }
            }
          }
        }
        tags {
          nodes {
            name
          }
        }
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
`;
