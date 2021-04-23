/* eslint-disable react/prop-types */
import { graphql } from 'gatsby';
import React from 'react';

import Content from 'components/pages/blog-post/content';
import Subscribe from 'components/shared/subscribe';
import MainLayout from 'layouts/main';

const BlogPost = ({
  data: {
    wpPost: { seo, title, author, date, url },
  },
  pageContext,
}) => (
  <MainLayout seo={seo} pageContext={pageContext}>
    <Content title={title} author={author} date={date} url={url} />
    <Subscribe />
  </MainLayout>
);

export const query = graphql`
  query($id: String!) {
    wpPost(id: { eq: $id }) {
      title
      author {
        node {
          firstName
          lastName
        }
      }
      date(formatString: "YYYY-MM-DD")
      url: uri
      ...wpPostSeo
    }
  }
`;

export default BlogPost;
