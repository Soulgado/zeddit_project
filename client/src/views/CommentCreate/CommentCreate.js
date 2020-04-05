import React, { useState } from 'react';
import { connect } from 'react-redux';

// should I send parent post as props?

function CommentCreateForm() {
  const [comment, setComment] = useState('')
  return (
    <form>
      <label for='comment'>Comment:</label>
      <input
        id='comment'
        type='text'
        value={comment}
        onChange={e => setComment(e.target.value)} />
      <button type='submit'>Post comment</button>
    </form>
  )
}

export default CommentCreateForm;