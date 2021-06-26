/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react";
import { Helmet } from "react-helmet";
import useSiteMetadata from "../hooks/useSiteMetaData";

interface SeoMetatags {
  name: string;
  property?: string;
  content?: string;
}

interface SeoProps {
  description?: string;
  lang?: string;
  meta?: SeoMetatags[];
  title: string;
}

const Seo: React.FC<SeoProps> = ({
  description = "",
  lang = `en`,
  meta = [],
  title,
}) => {
  const siteMetadata = useSiteMetadata();

  const metaDescription = description || siteMetadata.description;
  const defaultTitle = siteMetadata.title;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        }
      ].concat(meta)}
    />
  );
};

export default Seo;
