import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Switch, Route } from 'react-router-dom';
import { getSubzedditsList } from '../../redux/actionCreators';

const mapStateToProps = state => ({
  subzedditsList: state.subzedditsList,
  subzedditsNumber: state.subzedditsNumber
});

const mapDispatchToProps = dispatch => ({
  getSubzeddits: () => dispatch(getSubzedditsList())
})

function SubzedditList(props) {
  useEffect(() => {
    return () => {
      props.getSubzeddits();  // return function or infinite requests loop
    }
  });
  
  return (
    <div>
      <p>Total subzeddits nubmer: {props.subzedditsNumber}</p>
      <ul>
      {props.subzedditsNumber === 0
        ? <li>No subzeddits yet.</li>
        : props.subzedditsList.map(subzeddit => {
        return <li key={subzeddit.title}>{subzeddit.title}</li>
      })}
      </ul>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubzedditList);