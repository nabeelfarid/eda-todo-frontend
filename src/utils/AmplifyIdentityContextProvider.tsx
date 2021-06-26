import React, { createContext, useEffect, useState } from "react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import { Auth } from "aws-amplify";

interface IIdentityContext {
  user?: any;
  authState: AuthState;
  signout: () => Promise<void>;
}

export const AmplifyIdentityContext = createContext<IIdentityContext>({
  user: null,
  authState: AuthState.Loading,
  signout: async () => {},
});

const AmplifyIdentityContextProvider: React.FC = (props) => {
  const [authState, setAuthState] = React.useState<AuthState>();
  const [user, setUser] = React.useState<any>();

  const signout = async () => {
    await Auth.signOut({ global: true });
    setAuthState(AuthState.SignedOut);
    setUser(null);
  };

  React.useEffect(() => {
    async function getCurrentAuthenitcatedUser() {
      try {
        const authUser = await Auth.currentAuthenticatedUser();
        setUser(authUser);
        setAuthState(AuthState.SignedIn);
        console.log("Auth.currentAuthenticatedUser(): ", authUser);
      } catch (err) {
        setUser(null);
        setAuthState(AuthState.SignIn);
        console.error("Auth.currentAuthenticatedUser(): ", err);
      }
    }

    getCurrentAuthenitcatedUser();

    onAuthUIStateChange((nextAuthState: AuthState, authData?: object) => {
      console.log("Auth State changed: ", nextAuthState);
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return (
    <AmplifyIdentityContext.Provider
      value={{ user: user, authState: authState, signout: signout }}
    >
      {props.children}
    </AmplifyIdentityContext.Provider>
  );
};

export default AmplifyIdentityContextProvider;
