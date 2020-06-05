import React from "react";
import { Redirect } from "react-router-dom";

// user must not be logged to access the component
export function withLogging(WrappedComponent, redirectTo) {
  return class extends React.Component {
    render() {
      const { loggedIn, ...otherProps } = this.props;
      return (
        <div>
          {loggedIn ? (
            <Redirect to={redirectTo} />
          ) : (
            <WrappedComponent {...otherProps} />
          )}
        </div>
      );
    }
  };
}

// user should be logged
export function withoutLogging(WrappedComponent, redirectTo) {
  return class extends React.Component {
    render() {
      const { loggedIn, ...otherProps } = this.props;
      return (
        <div>
          {loggedIn ? (
            <WrappedComponent {...otherProps} />
          ) : (
            <Redirect to={redirectTo} />
          )}
        </div>
      );
    }
  };
}
