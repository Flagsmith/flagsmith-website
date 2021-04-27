/* eslint-disable react/prop-types */
import { graphql } from 'gatsby';
import parse, { attributesToProps } from 'html-react-parser';
import React from 'react';

import Content from 'components/pages/podcast/content';
import Audio from 'components/shared/audio';
import Subscribe from 'components/shared/subscribe';
import MainLayout from 'layouts/main';

const Podcast = ({
  data: {
    wpPodcast: {
      content,
      seo,
      title,
      date,
      url,
      author,
      acf: { podcastUrl },
    },
  },
  pageContext,
}) => {
  // https://github.com/remarkablemark/html-react-parser#htmlparser2
  // The library does parsing on client side differently from server side
  // it results in having a need of passing htmlparser2 to adjust behavior
  // according to the client side behavior

  let parsedContent;
  if (content) {
    parsedContent = parse(content, {
      htmlparser2: {
        lowerCaseAttributeNames: true,
      },
      replace: (domNode) => {
        const props = attributesToProps(domNode.attribs);
        if (domNode.type === 'tag') {
          switch (domNode.name) {
            case 'figure':
              return <Audio audioUrl={podcastUrl} {...props} />;
            default:
              return undefined;
          }
        }
        return undefined;
      },
    });
  }

  return (
    <MainLayout seo={seo} pageContext={pageContext}>
      <Content
        title={title}
        author={author}
        date={date}
        url={url}
        content={parsedContent}
        podcastUrl={podcastUrl}
      />
      <Subscribe />
    </MainLayout>
  );
};

export const query = graphql`
  query($id: String!) {
    wpPodcast(id: { eq: $id }) {
      content
      title
      date(formatString: "YYYY-MM-DD")
      url: uri
      author: lastEditedBy {
        node {
          firstName
          lastName
        }
      }
      acf {
        podcastUrl
      }
    }
  }
`;

export default Podcast;
