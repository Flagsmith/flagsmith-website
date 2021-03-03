// seo-component-specific function that creates correct path for the og:image
export default function createMetaImagePath(image, siteUrl) {
  switch (typeof image) {
    case 'object':
      return siteUrl + image.childImageSharp.fluid.src;
    default:
      return siteUrl + image;
  }
}
