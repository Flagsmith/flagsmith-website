/* eslint-disable react/prop-types */
import { graphql } from 'gatsby';
import parse, { attributesToProps } from 'html-react-parser';
import React from 'react';

import Code from 'components/lazy-blocks/code';
import Content from 'components/pages/blog-post/content';
import Subscribe from 'components/shared/subscribe';
import MainLayout from 'layouts/main';

const BlogPost = ({
  data: {
    wpPost: { content, seo, title, author, date, url },
  },
  pageContext,
}) => {
  // https://github.com/remarkablemark/html-react-parser#htmlparser2
  // The library does parsing on client side differently from server side
  // it results in having a need of passing htmlparser2 to adjust behavior
  // according to the client side behavior
  const reactedContent = parse(content, {
    htmlparser2: {
      lowerCaseAttributeNames: true,
    },
    replace: (domNode) => {
      const props = attributesToProps(domNode.attribs);

      if (domNode.type === 'tag') {
        switch (domNode.name) {
          case 'codeblock':
            return <Code language={props.language}>{props.code}</Code>;
          default:
            return undefined;
        }
      }
    },
  });
  return (
    <MainLayout seo={seo} pageContext={pageContext}>
      <Content title={title} author={author} date={date} url={url} content={reactedContent} />
      <Subscribe />
    </MainLayout>
  );
};

export const query = graphql`
  query($id: String!) {
    wpPost(id: { eq: $id }) {
      content
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
