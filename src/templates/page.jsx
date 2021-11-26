/* eslint-disable react/prop-types */
import { graphql } from 'gatsby';
import React from 'react';

import { useLazyBlocks } from 'hooks/use-lazy-blocks';
import MainLayout from 'layouts/main';

const Page = ({
  data: {
    wpPage: { seo, content },
  },
  pageContext,
}) => {
  const { reactedContent } = useLazyBlocks(content);
  return (
    <MainLayout seo={seo} pageContext={pageContext}>
      {reactedContent}
    </MainLayout>
  );
};

export default Page;

export const query = graphql`
  query($id: String!) {
    wpPage(id: { eq: $id }) {
      content
      ...wpPageSeo
    }
  }
`;
