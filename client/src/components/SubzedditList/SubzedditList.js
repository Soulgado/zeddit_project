import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSubzedditsList } from '../../redux/actionCreators';
import '../../styles/subzedditList.sass';

const mapStateToProps = state => ({
  subzedditsList: state.subzedditsList
});

const mapDispatchToProps = dispatch => ({
  getSubzeddits: () => dispatch(getSubzedditsList())
})

class SubzedditList extends React.Component {
  componentDidMount() {
    this.props.getSubzeddits();
  }
  
  render() {
    const { url } = this.props.match;
    const { subzedditsList } = this.props;
    return (
      <div>
        <p>List of all subzeddits:</p>
        <ul id='subzeddits-list'>
          {subzedditsList.map(subzeddit => {
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
  
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubzedditList);