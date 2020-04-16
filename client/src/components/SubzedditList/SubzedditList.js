import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSubzedditsList } from '../../redux/actionCreators';
import '../../styles/subzedditList.sass';
import SubzedditMinified from '../SubzedditMinified/SubzedditMinified';

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
      <div className='subzeddits-list-wrapper'>
        <h1 className='subzeddits-list-title'>List of all subzeddits:</h1>
        <div className='subzeddits-list'>
          <ul id='subzeddits-list'>
            {subzedditsList.map(subzeddit => {
            return <SubzedditMinified
                key={subzeddit.title}
                url={url}
                subzeddit={subzeddit} />
            })}
          </ul>
        </div>
      </div>
    )
  }
  
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubzedditList);