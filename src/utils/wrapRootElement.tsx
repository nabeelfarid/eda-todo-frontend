import React from "react";
import RootLayout from "../components/rootLayout";
import AmplifyConfigurationWrapper from "./AmplifyConfigurationWrapper";
import AmplifyIdentityContextProvider from "./AmplifyIdentityContextProvider";

export const wrapRootElement = ({ element }) => {
  console.info(`inside wrapRootElement`);

  return (
    <RootLayout>
      <AmplifyConfigurationWrapper>
        <AmplifyIdentityContextProvider>
          {element}
        </AmplifyIdentityContextProvider>
      </AmplifyConfigurationWrapper>
    </RootLayout>
  );
};
