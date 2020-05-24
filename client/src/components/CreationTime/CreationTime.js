import React from 'react';

const CreationTime = (props) => {
  function CalcTime(time) {
    let currentTime = new Date();
    let postedTime = new Date(time);
    const diffTime = currentTime - postedTime;
    if (diffTime < 3600000) {
      const renderedTime = Math.floor(diffTime / 1000 / 60);
      return (
        <span>{renderedTime} minutes ago</span>
      )
    } else if (diffTime < 86400000) {
        const renderedTime = Math.floor(diffTime / 1000 / 60 / 60);
        return (
          <span>{renderedTime} hours ago</span>
        )
    } else {
      const renderedTime = Math.floor(diffTime / 1000 / 60 / 60 / 24);
      return (
        <span>{renderedTime} days ago</span>
      )
    }
  }

  return (
    <>
    {CalcTime(props.time)}
    </>
  )
}

export default CreationTime;