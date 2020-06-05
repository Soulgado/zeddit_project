import React from "react";
import ReactLoading from "react-loading";

const Placeholder = () => {
  return (
    <div className="placeholder">
      <ReactLoading
        type="spokes"
        color="blue"
        height={"10%"}
        width={"10%"}
        className="loading-animation"
      />
      <p className="loading-text">Loading...</p>
    </div>
  );
};

export default Placeholder;
