import React from 'react';
import { connect } from 'react-redux';
import { getSubzedditsList } from '../../redux/actionCreators';
import '../../styles/subzedditList.sass';
import SubzedditMinified from '../SubzedditMinified/SubzedditMinified';

const mapStateToProps = state => ({
  user: state.currentUser.user,
  subzedditsList: state.subzeddit.subzedditsList
});

const mapDispatchToProps = dispatch => ({
  getSubzeddits: (user) => dispatch(getSubzedditsList(user))
})

class SubzedditList extends React.Component {
  componentDidMount() {
    this.props.getSubzeddits(this.props.user);
  }
  
  // problem doesn't show subscription status on first render
  
  render() {
    const { subzedditsList } = this.props;
    return (
      <div className='subzeddits-list-wrapper'>
        <h1 className='subzeddits-list-title'>List of all subzeddits:</h1>
        <div className='subzeddits-list'>
          <ul id='subzeddits-list'>
            {subzedditsList.map(subzeddit => {
            return <SubzedditMinified
                key={subzeddit.title}
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