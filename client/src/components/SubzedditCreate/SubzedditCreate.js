import React from 'react';
import { connect } from 'react-redux';
import { createSubzeddit, resetSubzedditFormErrors } from '../../redux/actionCreators';

const mapStateToProps = state => ({
  user: state.currentUser.user,
  errors: state.subzeddit.formErrors
})

const mapDispatchToProps = dispatch => ({
  createSubzeddit: (formData) => dispatch(createSubzeddit(formData)),
  resetErrors: () => dispatch(resetSubzedditFormErrors())
})

class SubzedditCreateForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    const title = this.props.title;
    const user = this.props.user.id;
    this.props.createSubzeddit({ title, user });
  }

  componentWillUnmount() {
    this.props.resetErrors();
  }

  render() {
    // ToDo: front-end errors handler
    const { handleChange, title } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <p className='form-title'>Create New Subzeddit</p>
        <div className='form-element'>
          <label htmlFor='title'>Title:</label>
          <input
            id='title'
            type='text'
            value={title}
            onChange={handleChange}></input>
        </div>
        <div className='form-errors'>
          {this.props.errors &&
            <p>{this.props.errors}</p>}
        </div>
        <button className='form-button' type='submit'>Create Subzeddit</button>
      </form>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubzedditCreateForm);