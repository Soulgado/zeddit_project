import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { resetCreationSuccess } from "../../redux/actionCreators";
import Placeholder from "../fetchingPlaceholder";
import { withoutLogging } from "../withLogging";
import SubzedditCreateForm from "../SubzedditCreate/SubzedditCreate";

const mapStateToProps = (state) => ({
  loggedIn: state.currentUser.loggedIn,
  loading: state.loading.loading,
  creationSuccess: state.subzeddit.creationSuccess,
  subzeddit: state.subzeddit.subzeddit, // to create link to the new subzeddit
});

const mapDispatchToProps = (dispatch) => ({
  resetCreationSuccess: () => dispatch(resetCreationSuccess()),
});

class SubzedditCreatePage extends React.Component {
  componentWillUnmount() {
    this.props.resetCreationSuccess();
  }

  render() {
    const { creationSuccess, loading, subzeddit } = this.props;

    return (
      // show message if created subzeddit
      // if not, show form or loading placeholder if request is pending
      <div className="create-page">
        <div className="create-wrapper">
          {creationSuccess ? (
            <div className="success-message">
              <p>The subzeddit was successfully created!</p>
              <p>
                Go to{" "}
                <Link to={`/sz/${subzeddit.title}`}>{subzeddit.title}</Link>
              </p>
            </div>
          ) : loading ? (
            <Placeholder />
          ) : (
            <SubzedditCreateForm />
          )}
        </div>
      </div>
    );
  }
}

SubzedditCreatePage.propTypes = {
  loggedIn: PropTypes.bool,
  loading: PropTypes.bool,
  creationSuccess: PropTypes.bool,
  subzeddit: PropTypes.object,
  resetCreationSuccess: PropTypes.func
}

const wrappedSubzedditCreatePage = withoutLogging(SubzedditCreatePage, "/login", "You must sign in to create new subzeddits");

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(wrappedSubzedditCreatePage);
