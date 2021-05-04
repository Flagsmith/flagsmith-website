// seo-component-specific function that creates correct path for the og:image
export default function createMetaImagePath(image, siteUrl) {
  switch (typeof image) {
    case 'object': {
      // return siteUrl + image.localFile.childImageSharp.fixed.src;
      const { childImageSharp, publicURL } = image.localFile;
      return childImageSharp ? siteUrl + childImageSharp.fixed.src : siteUrl + publicURL;
    }
    default:
      return siteUrl + image;
  }
}
