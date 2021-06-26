import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

const RootLayout = (props) => {
  return (
    <React.Fragment>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
        />
      </Helmet>
      {props.children}
    </React.Fragment>
  );
};

RootLayout.propTypes = {
  children: PropTypes.node,
};

export default RootLayout;
