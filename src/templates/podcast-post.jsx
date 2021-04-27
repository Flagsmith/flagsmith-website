/* eslint-disable react/prop-types */
import { graphql } from 'gatsby';
import parse, { attributesToProps } from 'html-react-parser';
import React from 'react';

import Content from 'components/pages/podcast/content';
import Subscribe from 'components/shared/subscribe';
import MainLayout from 'layouts/main';

const Podcast = ({
  data: {
    wpPodcast: { content, seo, title, date, url, acf: data, author },
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
          // switch (domNode.name) {
          //   case 'relativelinks': {
          //     const links = JSON.parse(props.items);
          //     return <RelativeLinks {...props} items={links} />;
          //   }
          //   default:
          //     return undefined;
          // }
        }
        return undefined;
      },
    });
  }

  return (
    <MainLayout seo={seo} pageContext={pageContext}>
      <Content
        title={title}
        date={date}
        url={url}
        content={parsedContent}
        {...data}
        author={author}
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
      author {
        node {
          firstName
          lastName
        }
      }
      acf {
        podcastUrl
        quote
        logo {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(width: 150)
            }
          }
        }
        host {
          fullName
          photo {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData(width: 80)
              }
            }
          }
        }

        guest {
          fullName
          position
          description
          additionalInformation
          photo {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData(width: 80)
              }
            }
          }
        }
        relatedLinks {
          fieldGroupName
          textPostfix
          link {
            target
            title
            url
          }
        }
      }
    }
  }
`;

export default Podcast;
