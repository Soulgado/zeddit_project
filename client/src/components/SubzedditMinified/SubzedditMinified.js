import React from 'react';
import { Link } from 'react-router-dom';

const SubzedditMinified = ({ url, subzeddit }) => {
  // add subscribe button
  return (
    <li>
      <div>
        <Link to={`${url}/${subzeddit.title}`}>
          {subzeddit.title}
        </Link>
        <p>Created {subzeddit.creation_date} by {subzeddit.username}</p>
        <button type='button'>
          Subscribe
          {/* subscribe - unsubscribe buttons */}
        </button>
      </div>
    </li>
  )
}

export default SubzedditMinified;