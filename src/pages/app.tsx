import React, { useContext, useEffect } from "react";
import { Router } from "@reach/router";

import { Box } from "@material-ui/core";
import Dashboard from "../components/Dashboard";
import Loader from "../components/Loader";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { AmplifyIdentityContext } from "../utils/AmplifyIdentityContextProvider";
import { AuthState } from "@aws-amplify/ui-components";
import { navigate } from "gatsby";

const App = () => {
  const { user, authState } = useContext(AmplifyIdentityContext);

  useEffect(() => {
    console.log("inside app useeffect - user", user);
    console.log("inside app useeffect - authstate", authState);

    if (
      !user &&
      (authState === AuthState.SignIn || authState === AuthState.SignedOut)
    ) {
      console.log("navigating from App to Index ", user);

      navigate("/", { replace: true });
    }
  }, [user, authState]);

  return (
    <Layout appBarTitle="Dashboard" appBarTitleUrl="/app">
      <Seo title="Dashboard" />
      <Box my={4}>
        {authState !== AuthState.SignedIn ? (
          <>
            <Loader showCircularProgress={false} />
          </>
        ) : (
          <Router basepath="/app">
            <Dashboard path="/" />
          </Router>
        )}
        {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      </Box>
    </Layout>
  );
};
export default App;
