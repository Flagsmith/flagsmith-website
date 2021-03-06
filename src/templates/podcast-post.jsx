/* eslint-disable react/prop-types */
import { graphql } from 'gatsby';
import parse, { attributesToProps } from 'html-react-parser';
import React from 'react';

import Content from 'components/pages/podcast-post/content';
import Subscribe from 'components/shared/subscribe';
import MainLayout from 'layouts/main';

const Podcast = ({
  data: {
    wpPodcast: { content, seo, title, date, url, acf: data, author },
  },
  pageContext,
}) => (
  <MainLayout seo={seo} pageContext={pageContext}>
    <Content title={title} date={date} url={url} content={content} {...data} author={author} />
    <Subscribe />
  </MainLayout>
);
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
          acf {
            avatar {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(width: 80)
                }
              }
            }
          }
        }
      }
      acf {
        podcastUrl
        quote
        logo {
          altText
          localFile {
            publicURL
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
      ...wpPodcastSeo
    }
  }
`;

export default Podcast;
