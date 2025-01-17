import React from "react";
import ReactDOM from "react-dom";
import { Authenticator } from "aws-amplify-react";
import { GlobalStyle } from "shared/styles";
import { isAuthenticated } from "shared/utils";
import { amplifyConfig, authenticatorConfig } from "shared/amplify.config";
import { Amplify } from "aws-amplify";
import { AuthState } from "shared/interfaces/amplify.interface";
import * as serviceWorker from "./serviceWorker";
import App from "App";

const Guard = ({ authState }: { authState?: AuthState }) => {
  if (isAuthenticated(authState || "")) {
    return <App />;
  }
  return null;
};

const CognitoBoilerplate = () => {
  return (
    <React.StrictMode>
      <GlobalStyle />
      <Authenticator {...authenticatorConfig}>
        <Guard />
      </Authenticator>
    </React.StrictMode>
  );
};

// Wait for Amplify configuration apply
(async () => {
  Amplify.configure(amplifyConfig);
  ReactDOM.render(<CognitoBoilerplate />, document.getElementById("root"));
})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
