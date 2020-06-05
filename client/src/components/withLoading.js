import React from "react";
import Placeholder from "./fetchingPlaceholder";

export function withLoading(WrappedComponent) {
  return class extends React.Component {
    componentDidMount() {
      this.props.fetchData(this.props.user);
    }

    render() {
      return (
        <>
          {this.props.loading ? (
            <Placeholder />
          ) : (
            <WrappedComponent {...this.props} />
          )}
        </>
      );
    }
  };
}
