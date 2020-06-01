import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserSubscriptions } from '../../redux/actionCreators';

const mapStateToProps = state => ({
  user: state.currentUser.user,
  subscriptions: state.userAction.userSubscriptions
});

const mapDispatchToProps = dispatch => ({
  getSubscriptions: user => dispatch(getUserSubscriptions(user))
})

class SubscriptionsListNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownActive: false
    }

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.getSubscriptions(this.props.user.id);
  }

  handleClick() {
    this.setState({
      dropdownActive: !this.state.dropdownActive
    })
  }

  renderSubscriptions() {
    return (
      <ul className='subscriptions-dropdown'>
        {this.props.subscriptions.map(subzeddit => {
          return (
            <li key={subzeddit.title}>
              <Link to={`/sz/${subzeddit.title}`}>
                {subzeddit.title}
              </Link>
            </li>
          )
        })}
      </ul>
    )
  }

  render() {
    return (
      <li className='navigation-element'>
        <button type='button' onClick={this.handleClick}>
          My Communities
        </button>
        {this.state.dropdownActive
          ? this.renderSubscriptions()
          : null
        }
      </li>  
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionsListNav);