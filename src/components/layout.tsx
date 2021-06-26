import * as React from "react";
import { Box, Container, Divider, Link, Typography } from "@material-ui/core";
import Header from "./header";
import useSiteMetadata from "../hooks/useSiteMetaData";

interface LayoutProps {
  appBarTitle?: string;
  appBarTitleUrl?: string;
}

const Layout: React.FC<LayoutProps> = ({
  appBarTitle,
  appBarTitleUrl,
  children,
}) => {
  const siteMetadata = useSiteMetadata();

  return (
    <>
      <Header appBarTitle={appBarTitle} appBarTitleUrl={appBarTitleUrl} />
      <Container maxWidth="md">
        <Box mt={2}>
          <main>{children}</main>
          <footer>
            <Box mt={5} textAlign="center">
              <Divider />
              <Box mt={1}>
                <Typography>
                  © {new Date().getFullYear()}, Built with
                  {` `}
                  <Link
                    color="primary"
                    href="https://www.gatsbyjs.com"
                    target="blank"
                    rel="noopener"
                  >
                    Gatsby
                  </Link>
                </Typography>
                <Typography>
                  {"Powered by "}
                  <Link
                    color="primary"
                    href="https://material-ui.com/"
                    target="blank"
                    rel="noopener"
                  >
                    Material-UI
                  </Link>
                  {", "}
                  <Link
                    color="primary"
                    href="https://aws.amazon.com/"
                    target="blank"
                    rel="noopener"
                  >
                    AWS
                  </Link>
                  {" and "}
                  <Link
                    color="primary"
                    href="https://graphql.org/"
                    target="blank"
                    rel="noopener"
                  >
                    GraphQL
                  </Link>
                </Typography>
                <Typography>
                  {"Hosted on "}
                  <Link
                    color="primary"
                    href="https://aws.amazon.com/cloudfront/"
                    target="blank"
                    rel="noopener"
                  >
                    AWS Cloudfront
                  </Link>
                  {", written by "}
                  {siteMetadata.author}
                  {", inspired by this "}
                  <Link
                    color="primary"
                    href="https://aws.amazon.com/blogs/mobile/building-scalable-graphql-apis-on-aws-with-cdk-and-aws-appsync/"
                    target="blank"
                    rel="noopener"
                  >
                    post
                  </Link>
                </Typography>
              </Box>
            </Box>
          </footer>
        </Box>
      </Container>
    </>
  );
};

export default Layout;
