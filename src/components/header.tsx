import React, { useContext } from "react";
import { Link as GatsbyLink } from "gatsby";
import {
  AppBar,
  Box,
  Tooltip,
  Typography,
  Toolbar,
  IconButton,
} from "@material-ui/core";
import { GitHub, PowerSettingsNew } from "@material-ui/icons";
import useSiteMetadata from "../hooks/useSiteMetaData";
import { AmplifyIdentityContext } from "../utils/AmplifyIdentityContextProvider";
import { AuthState } from "@aws-amplify/ui-components";

interface HeaderProps {
  //   siteMetadata: {
  //     title?: string;
  //     subtitle?: string;
  //     repo?: string;
  //   };
  //   pathname?: string;
  appBarTitle?: string;
  appBarTitleUrl?: string;
}
const Header: React.FC<HeaderProps> = ({ appBarTitle, appBarTitleUrl }) => {
  const { user, authState, signout } = useContext(AmplifyIdentityContext);

  const siteMetadata = useSiteMetadata();

  // console.log("path", props.pathname);
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography
          variant="h5"
          component={GatsbyLink}
          to={appBarTitleUrl ? appBarTitleUrl : "/"}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          {appBarTitle ? appBarTitle : siteMetadata.title}
        </Typography>
        <Box flexGrow={1} />

        {authState === AuthState.SignedIn && user && user.attributes && (
          <>
            <Typography>{user.attributes.name}</Typography>
            <Tooltip title="Logout">
              <IconButton
                aria-label="logout"
                onClick={async () => await signout()}
                color="inherit"
              >
                <PowerSettingsNew />
              </IconButton>
            </Tooltip>
          </>
        )}
        <Tooltip title="Github Repo">
          <IconButton
            color="inherit"
            aria-label="github"
            href={siteMetadata.repo}
            target="blank"
            rel="noopener"
          >
            <GitHub />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
