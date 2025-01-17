import React from "react";
import styled from "styled-components";
import { ForgotPassword } from "aws-amplify-react";
import { IAuthPieceProps } from "aws-amplify-react/lib-esm/Auth/AuthPiece";
import {
  Input,
  Form,
  Button,
  FormField,
  CustomLink,
  Container,
} from "shared/components/Auth/common";

const CustomForgotPasswordContainer = styled(Container)`
  justify-content: center;
  align-items: center;
  label {
    text-transform: capitalize;
  }
`;

class CustomForgotPassword extends ForgotPassword {
  constructor(props: IAuthPieceProps) {
    super(props);
    this._validAuthStates = ["forgotPassword"];
  }

  renderRequestCode(theme: any) {
    return (
      <FormField>
        <label htmlFor={this.props.usernameAttributes}>
          {this.props.usernameAttributes || ""} *
        </label>
        <Input
          autoFocus
          placeholder={`Enter your ${this.getUsernameLabel().toLowerCase()}`}
          theme={theme}
          key={this.props.usernameAttributes}
          name={this.props.usernameAttributes}
          type={this.props.usernameAttributes}
          onChange={this.handleInputChange}
        />
      </FormField>
    );
  }

  renderRequestNewPassword(theme: any) {
    return (
      <>
        <FormField theme={theme}>
          <label>Code *</label>
          <Input
            placeholder={"Code"}
            theme={theme}
            key="code"
            name="code"
            autoComplete="off"
            onChange={this.handleInputChange}
          />
        </FormField>
        <FormField theme={theme}>
          <label>New password *</label>
          <Input
            placeholder={"New Password"}
            theme={theme}
            type="password"
            key="password"
            name="password"
            autoComplete="off"
            onChange={this.handleInputChange}
            style={{ marginBottom: "10px" }}
          />
          <CustomLink
            style={{ margin: "0 0 10px", fontSize: "0.8rem" }}
            onClick={() => this.setState({ delivery: null })}
          >
            Change {this.props.usernameAttributes} ?
          </CustomLink>
        </FormField>
      </>
    );
  }

  showComponent(theme: any) {
    return (
      <CustomForgotPasswordContainer>
        <Form>
          {/**
           * As a workaround we use a children because we can't add
           * more props from the time that SignUp class is not a generic class.
           */}
          {this.props.children}
          {this.state.delivery || this.props.authData?.username
            ? this.renderRequestNewPassword(theme)
            : this.renderRequestCode(theme)}
          {this.state.delivery || this.props.authData?.username ? (
            <Button
              data-test="forgot-password-send-code-button"
              theme={theme}
              onClick={(ev) => {
                this.submit();
                ev.preventDefault();
              }}
            >
              Submit
            </Button>
          ) : (
            <Button
              data-test="forgot-password-send-code-button"
              theme={theme}
              onClick={(ev) => {
                this.send();
                ev.preventDefault();
              }}
            >
              Send Code
            </Button>
          )}
          <CustomLink
            data-test="forgot-password-back-to-sign-in-link"
            onClick={() => this.changeState("signIn")}
          >
            Back to Sign In
          </CustomLink>
        </Form>
      </CustomForgotPasswordContainer>
    );
  }
}

export default CustomForgotPassword;
