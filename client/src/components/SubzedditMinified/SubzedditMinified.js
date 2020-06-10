import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { format } from "date-fns";
import SubscribeButton from "../SubscribeButton/SubscribeButton";

const mapStateToProps = (state) => ({
  loggedIn: state.currentUser.loggedIn,
});

const SubzedditMinified = ({ loggedIn, subzeddit }) => {
  // subscribe button doesn't receive change text
  return (
    <li>
      <div className="subzeddit-mini">
        <div className="subzeddit-metadata">
          <Link to={`/sz/${subzeddit.title}`}>{subzeddit.title}</Link>
          <p>
            Created {format(subzeddit.creation_date, "dd MMMM yyyy")} by u/{subzeddit.username}
          </p>
          <p className="subscribers-num">
            {subzeddit.subscriptions} subscribers
          </p>
        </div>
        {loggedIn ? <SubscribeButton subzeddit={subzeddit} /> : ""}
      </div>
    </li>
  );
};

SubzedditMinified.propTypes = {
  loggedIn: PropTypes.bool,
  subzeddit: PropTypes.object
}

export default connect(mapStateToProps)(SubzedditMinified);
