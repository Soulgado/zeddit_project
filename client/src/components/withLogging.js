import React from "react";
import { Redirect } from "react-router-dom";

// user must not be logged to access the component
export function withLogging(WrappedComponent, redirectTo) {
  return class extends React.Component {
    render() {
      const { loggedIn, ...otherProps } = this.props;
      return (
        <>
          {loggedIn ? (
            <Redirect to={redirectTo} />
          ) : (
            <WrappedComponent {...otherProps} />
          )}
        </>
      );
    }
  };
}

// user must be logged
export function withoutLogging(WrappedComponent, redirectTo, message) {
  return class extends React.Component {
    render() {
      const { loggedIn, ...otherProps } = this.props;
      return (
        <>
          {loggedIn ? (
            <WrappedComponent {...otherProps} />
          ) : (
            <Redirect to={{
              pathname: redirectTo,
              state: {
                message
              },
              }}
            />
          )}
        </>
      );
    }
  };
}
