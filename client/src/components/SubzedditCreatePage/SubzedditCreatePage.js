import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  resetCreationSuccess,
  resetSubzedditFormErrors,
} from "../../redux/actionCreators";
import Placeholder from "../fetchingPlaceholder";
import SubzedditCreateForm from "../SubzedditCreate/SubzedditCreate";

const mapStateToProps = (state) => ({
  loading: state.loading.loading,
  creationSuccess: state.subzeddit.creationSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  resetCreationSuccess: () => dispatch(resetCreationSuccess()),
  resetErrors: () => dispatch(resetSubzedditFormErrors()),
});

class SubzedditCreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
    this.props.resetErrors();
  };

  componentWillUnmount() {
    this.props.resetCreationSuccess();
  }

  render() {
    const { title } = this.state;
    const { creationSuccess, loading } = this.props;
    const { handleChange } = this;

    return (
      // show message if created subzeddit
      // if not, show form or loading placeholder if request is pending
      <div className="create-page">
        <div className="create-wrapper">
          {creationSuccess ? (
            <div>
              <p>The subzeddit was successfully created!</p>
              <p>
                Go to <Link to={`/sz/${title}`}>{title}</Link>
              </p>
            </div>
          ) : loading ? (
            <Placeholder />
          ) : (
            <SubzedditCreateForm handleChange={handleChange} title={title} />
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubzedditCreatePage);
