import React, { ReactNode } from "react";
import Amplify from "aws-amplify";
import awsmobile from "../aws-exports";

interface AmplifyConfigurationWrapperProps {
  children: ReactNode;
}

const AmplifyConfigurationWrapper: React.FC<AmplifyConfigurationWrapperProps> =
  ({ children }) => {
    Amplify.configure(awsmobile);

    return <>{children}</>;
  };

export default AmplifyConfigurationWrapper;
