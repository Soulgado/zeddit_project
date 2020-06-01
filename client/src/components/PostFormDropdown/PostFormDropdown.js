import React from 'react';

const Dropdown = (props) => {
  return (
    <ul className='form-subzeddits-dropdown' >
      {
        props.titlesList.map(subzeddit => {
          return (
            <li
              key={subzeddit.title}
              onClick={props.handleClick}>
              {subzeddit.title}
            </li>
          )
        })
      }
    </ul>
  )
}

export default Dropdown;