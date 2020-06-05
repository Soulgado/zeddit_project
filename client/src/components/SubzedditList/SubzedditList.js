import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getSubzedditsList } from "../../redux/actionCreators";
import "../../styles/subzedditList.sass";
import SubzedditMinified from "../SubzedditMinified/SubzedditMinified";
import Placeholder from "../fetchingPlaceholder";

const mapStateToProps = (state) => ({
  user: state.currentUser.user,
  subzedditsList: state.subzeddit.subzedditsList,
  loading: state.loading.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getSubzeddits: (user) => dispatch(getSubzedditsList(user)),
});

class SubzedditList extends React.Component {
  componentDidMount() {
    this.props.getSubzeddits(this.props.user);
  }

  render() {
    const { subzedditsList, loading } = this.props;
    return (
      <div className="main-content">
        <div className="subzeddits-list-wrapper">
          <h1 className="subzeddits-list-title">List of all subzeddits:</h1>
          <div className="subzeddits-list">
            {loading ? (
              <Placeholder />
            ) : (
              <ul id="subzeddits-list">
                {subzedditsList.map((subzeddit) => {
                  return (
                    <SubzedditMinified
                      key={subzeddit.title}
                      subzeddit={subzeddit}
                    />
                  );
                })}
              </ul>
            )}
          </div>
        </div>
        <aside className="sidebar-wrapper main-page-sidebar">
          <Link to="/create_subzeddit">
            <button type="button">Create Subzeddit</button>
          </Link>
          <Link to="/submit_post">
            <button type="button">Submit a new Post</button>
          </Link>
        </aside>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubzedditList);
