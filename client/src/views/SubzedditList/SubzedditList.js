import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import { getSubzedditsList } from '../../redux/actionCreators';

const mapStateToProps = state => ({
  subzedditsList: state.subzedditsList,
  subzedditsNumber: state.subzedditsNumber
});

const mapDispatchToProps = dispatch => ({
  getSubzeddits: () => dispatch(getSubzedditsList())
})

function SubzedditList(props) {
  const { url, path } = useRouteMatch();
  const subzedditNumber = props.subzedditsNumber;

  useEffect(() => {
      props.getSubzeddits();  // return function or infinite requests loop happen
    }, [subzedditNumber]);
  
  return (
    <div>
      <p>Total subzeddits number: {props.subzedditsNumber}</p>
      <ul>
      {props.subzedditsNumber === 0
        ? <li>No subzeddits yet.</li>
        : props.subzedditsList.map(subzeddit => {
        return (
          <li key={subzeddit.title}>
            <Link to={`${url}/${subzeddit.title}`}>
                {subzeddit.title}</Link>
          </li>
        )
      })}
      </ul>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubzedditList);