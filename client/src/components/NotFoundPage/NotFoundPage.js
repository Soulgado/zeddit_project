import React from "react";
import "../../styles/notFoundPage.sass";

const NotFoundPage = (props) => {
  return (
    <div className="not-found-wrapper">
      <div className="not-found-content">
        <p className="not-found-404">404 Error</p>
        <p className="not-found-text">Page not found</p>
        <p className="not-found-location">The page <span>{props.location.pathname}</span> is not found.</p>
      </div>
    </div>
  )
}

export default NotFoundPage;