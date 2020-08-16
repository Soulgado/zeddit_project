import * as types from "../../redux/types";
import * as loadingReducer from "../../redux/reducers/loadingReducers";
import * as postReducer from "../../redux/reducers/postReducers";
import * as subzedditReducer from "../../redux/reducers/subzedditReducer";
import * as userActionsReducer from "../../redux/reducers/userActionsReducer";
import * as userReducer from "../../redux/reducers/userReducers";

describe("testing loadingReducer", () => {
  const reducer = loadingReducer.reducer;
  it("returns the initial state", () => {
    expect(reducer(undefined, {})).toEqual(
      {
        loading: false
      }
    );
  });

  it("handles LOADING action", () => {
    expect(reducer(undefined, {
      type: types.LOADING
    })).toEqual(
      {
        loading: true
      }
    );
  });

  it("handles END_LOADING action", () => {
    expect(reducer({ loading: true }, {
      type: types.END_LOADING
    })).toEqual(
      {
        loading: false
      }
    );
  });
});

describe("testing postReducer", () => {
  const reducer = postReducer.reducer;
  const initialState = postReducer.initialState;
  let expectedState = {};
  
  beforeEach(() => {
    expectedState = {...initialState};
  })
  it("returns initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("handles post creation", () => {
    expectedState.post = {
      title: "post title",
      content: "post content"
    };
    expectedState.creationFlag = true;

    expect(reducer(undefined, {
      type: types.CREATE_POST,
      payload: {
        result: "success",
        data: {
          title: "post title",
          content: "post content"
        }
      }
    })).toEqual(expectedState);

    const expectedStateSecond = {...initialState};
    expectedStateSecond.formErrors = "Wrong username";

    expect(reducer(undefined, {
      type: types.CREATE_POST,
      payload: {
        result: "error",
        errors: "Wrong username"
      }
    })).toEqual(expectedStateSecond);
  });

  it("handles GET_POST actions", () => {
    expectedState.post = {
      title: "some post",
      content: "some post content"
    };

    expect(reducer(undefined, {
      type: types.GET_POST,
      payload: {
        result: "success",
        data: {
          title: "some post",
          content: "some post content"
        }
      }
    })).toEqual(expectedState);
  });

  it("handles POST_COMMENT action", () => {
    expectedState.creationFlag = true;

    expect(reducer(undefined, {
      type: types.POST_COMMENT,
      payload: {
        result: "success"
      }
    })).toEqual(expectedState);
  });

  it("handles EDIT_COMMENT action", () => {
    expectedState.creationFlag = true;

    expect(reducer(undefined, {
      type: types.EDIT_COMMENT,
      payload: {
        result: "success"
      }
    })).toEqual(expectedState);
  });

  it("handles DELETE_COMMENT action", () => {
    expectedState.creationFlag = true;

    expect(reducer(undefined, {
      type: types.DELETE_COMMENT,
      payload: {
        result: "success"
      }
    })).toEqual(expectedState);
  });

  it("handles EDIT_POST action", () => {
    expectedState.creationFlag = true;

    expect(reducer(undefined, {
      type: types.EDIT_POST,
      payload: {
        result: "success"
      }
    })).toEqual(expectedState);
  });

  it("handles DELETE_POST action", () => {
    expectedState.postDeleteFlag = true;

    expect(reducer(undefined, {
      type: types.DELETE_POST,
      payload: {
        result: "success"
      }
    })).toEqual(expectedState);
  });

  it("handles RESET_COMMENT_CREATION_FLAG action", () => {
    const startingState = {...expectedState};
    startingState.creationFlag = true;

    expect(reducer(startingState, {
      type: types.RESET_COMMENT_CREATION_FLAG
    })).toEqual(expectedState);
  });

  it("handles RESET_POST_FORM_ERRORS action", () => {
    const startingState = {...expectedState};
    startingState.formErrors = "Some Error";

    expect(reducer(startingState, {
      type: types.RESET_POST_FORM_ERRORS
    })).toEqual(expectedState);
  });

  it("handles RESET_POST_DELETE_FLAG action", () => {
    const startingState = {...expectedState};
    startingState.postDeleteFlag = true;

    expect(reducer(startingState, {
      type: types.RESET_POST_DELETE_FLAG
    })).toEqual(expectedState);
  });
});

describe("tests subzedditReducer", () => {
  const reducer = subzedditReducer.reducer;
  const initialState = subzedditReducer.initialState; 
  let expectedState = {};
  
  beforeEach(() => {
    expectedState = {...initialState};
  });

  it("returns initial state", () => {
    expect(reducer(undefined, {})).toEqual(expectedState);
  });

  it("handles GET_SUBZEDDITS action", () => {
    expectedState.subzedditsList = ["first subzeddit", "second subzeddit"];

    expect(reducer(undefined, {
      type: types.GET_SUBZEDDITS,
      payload: {
        result: "success",
        data: ["first subzeddit", "second subzeddit"]
      }
    })).toEqual(expectedState);
  });

  it("handles CREATE_SUBZEDDIT action", () => {
    const subzeddit = {
      title: "subzeddit's title",
      description: "description of the subzeddit"
    };
    expectedState.creationSuccess = true;
    expectedState.subzeddit = subzeddit;

    expect(reducer(undefined, {
      type: types.CREATE_SUBZEDDIT,
      payload: {
        result: "success",
        data: subzeddit
      }
    })).toEqual(expectedState);
  });

  it("handles CREATE_SUBZEDDIT action with errors", () => {
    expectedState.formErrors = "Title error";

    expect(reducer(undefined, {
      type: types.CREATE_SUBZEDDIT,
      payload: {
        result: "error",
        errors: "Title error"
      }
    })).toEqual(expectedState);
  });

  it("handles SUBZEDDIT_DETAIL action", () => {
    const subzeddit = {
      title: "Subzeddit's title",
      description: "Subzeddit description"
    };
    expectedState.subzeddit = subzeddit;

    expect(reducer(undefined, {
      type: types.SUBZEDDIT_DETAIL,
      payload: {
        result: "success",
        data: subzeddit
      }
    })).toEqual(expectedState);
  });

  it("handles GET_SUBZEDDIT_POSTS action", () => {
    const posts = ["first post", "second post"];

    expectedState.postsList = posts;

    expect(reducer(undefined, {
      type: types.GET_SUBZEDDIT_POSTS,
      payload: {
        result: "success",
        data: posts
      }
    })).toEqual(expectedState);
  });

  it("handles GET_MOST_POPULAR_DEFAULT", () => {
    const posts = ["first post", "second post", "third post"];

    expectedState.mostPopularGlobal = posts;

    expect(reducer(undefined, {
      type: types.GET_MOST_POPULAR_DEFAULT,
      payload: {
        result: "success",
        data: posts
      }
    })).toEqual(expectedState);
  });

  it("handles GET_SUBZEDDIT_TITLES action", () => {
    const titles = ["first title", "second title"];

    expectedState.subzedditsTitles = titles;

    expect(reducer(undefined, {
      type: types.GET_SUBZEDDITS_TITLES,
      payload: {
        result: "success",
        data: titles
      }
    })).toEqual(expectedState);
  });

  it("handles RESET_CREATION_SUCCESS action", () => {
    const initialState = {...expectedState};
    initialState.creationFlag = true;

    expect(reducer(undefined, {
      type: types.RESET_CREATION_SUCCESS,
    })).toEqual(expectedState);
  });

  it("handles RESET_SUBZEDDIT_FORM_ERRORS action", () => {
    const initialState = {...expectedState};
    initialState.formErrors = "Title error";

    expect(reducer(undefined, {
      type: types.RESET_SUBZEDDIT_FORM_ERRORS,
    })).toEqual(expectedState);
  });
});

describe("tests userActionsReducer", () => {
  const reducer = userActionsReducer.reducer;
  const initialState = userActionsReducer.initialState; 
  let expectedState = {};
  
  beforeEach(() => {
    expectedState = {...initialState};
  });

  it("returns the initial state", () => {
    expect(reducer(undefined, {})).toEqual(expectedState);
  });

  it("handles GET_USER_UPVOTED_POSTS action", () => {
    const posts = ["first upvoted post", "second upvoted post"];

    expectedState.userUpvotedPosts = posts;

    expect(reducer(undefined, {
      type: types.GET_USER_UPVOTED_POSTS,
      payload: {
        result: "success",
        data: posts
      }
    })).toEqual(expectedState);
  });

  it("handles GET_USER_DOWNVOTED_POSTS action", () => {
    const posts = ["first downvoted post", "second downvoted post"];

    expectedState.userDownvotedPosts = posts;

    expect(reducer(undefined, {
      type: types.GET_USER_DOWNVOTED_POSTS,
      payload: {
        result: "success",
        data: posts
      }
    })).toEqual(expectedState);
  });

  it("handles GET_USER_SUBSCRIPTIONS action", () => {
    const subscriptions = ["first subscription", "second subscription"];

    expectedState.userSubscriptions = subscriptions;

    expect(reducer(undefined, {
      type: types.GET_USER_SUBSCRIPTIONS,
      payload: {
        result: "success",
        data: subscriptions
      }
    })).toEqual(expectedState);
  });

  it("handles GET_SUBMITTED_POSTS action", () => {
    const submitted = ["first submitted post", "second submitted post"];

    expectedState.userSubmittedPosts = submitted;

    expect(reducer(undefined, {
      type: types.GET_SUBMITTED_POSTS,
      payload: {
        result: "success",
        data: submitted
      }
    })).toEqual(expectedState);
  });
});

describe("tests userReducer", () => {
  const reducer = userReducer.reducer;
  const initialState = userReducer.initialState; 
  let expectedState = {};
  
  beforeEach(() => {
    expectedState = {...initialState};
  });

  it("returns the initial state", () => {
    expect(reducer(undefined, {})).toEqual(expectedState);
  });

  it("handles CREATE_ACCOUNT action", () => {
    expectedState.successFlag = true;

    expect(reducer(undefined, {
      type: types.CREATE_ACCOUNT,
      payload: {
        result: "success"
      }
    })).toEqual(expectedState);
  });

  it("handles CREATE_ACCOUNT action errors", () => {
    expectedState.formErrors = "Username error";

    expect(reducer(undefined, {
      type: types.CREATE_ACCOUNT,
      payload: {
        result: "error",
        errors: "Username error"
      }
    })).toEqual(expectedState);
  });

  it("handles LOGIN action", () => {
    const user = {
      username: "admin"
    };

    expectedState.user = user;
    expectedState.loggedIn = true;
    expectedState.successFlag = true;

    expect(reducer(undefined, {
      type: types.LOGIN,
      payload: {
        result: "success",
        user
      }
    })).toEqual(expectedState);
  });

  it("handles LOGIN action errors", () => {
    expectedState.formErrors = "Password error";

    expect(reducer(undefined, {
      type: types.LOGIN,
      payload: {
        result: "error",
        errors: "Password error"
      }
    })).toEqual(expectedState);
  });

  it("handles LOGOUT action", () => {
    const initialState = {...expectedState};

    initialState.loggedIn = true;
    initialState.user = { username: "admin" };

    expect(reducer(initialState, {
      type: types.LOGOUT
    })).toEqual(expectedState)
  });

  it("handles RESET_REGISTRATION_SUCCESS action", () => {
    const initialState = {...expectedState};

    initialState.successFlag = true;

    expect(reducer(initialState, {
      type: types.RESET_REGISTRATION_SUCCESS,
    })).toEqual(expectedState);
  });

  it("handles RESET_USER_FORM_ERRORS action", () => {
    const initialState = {...expectedState};

    initialState.formErrors = "Username error";

    expect(reducer(initialState, {
      type: types.RESET_USER_FORM_ERRORS
    })).toEqual(expectedState);
  });

  it("handles UPDATE_USERNAME action", () => {
    expectedState.successFlag = true;

    expect(reducer(undefined, {
      type: types.UPDATE_USERNAME,
      payload: {
        result: "success"
      }
    })).toEqual(expectedState);

    expectedState.successFlag = false;
    expectedState.formErrors = "Username error";

    expect(reducer(undefined, {
      type: types.UPDATE_USERNAME,
      payload: {
        result: "error",
        errors: "Username error"
      }
    })).toEqual(expectedState);
  });

  it("handles UPDATE_PASSWORD action", () => {
    expectedState.successFlag = true;

    expect(reducer(undefined, {
      type: types.UPDATE_PASSWORD,
      payload: {
        result: "success"
      }
    })).toEqual(expectedState);

    expectedState.successFlag = false;
    expectedState.formErrors = "Password error";

    expect(reducer(undefined, {
      type: types.UPDATE_PASSWORD,
      payload: {
        result: "error",
        errors: "Password error"
      }
    })).toEqual(expectedState);
  });

  it("handles UPDATE_EMAIL action", () => {
    expectedState.successFlag = true;

    expect(reducer(undefined, {
      type: types.UPDATE_EMAIL,
      payload: {
        result: "success"
      }
    })).toEqual(expectedState);

    expectedState.successFlag = false;
    expectedState.formErrors = "Email error";

    expect(reducer(undefined, {
      type: types.UPDATE_EMAIL,
      payload: {
        result: "error",
        errors: "Email error"
      }
    })).toEqual(expectedState);
  });
  
  it("handles DELETE_ACCOUNT action", () => {
    expectedState.successFlag = true;

    expect(reducer(undefined, {
      type: types.DELETE_ACCOUNT,
      payload: {
        result: "success"
      }
    })).toEqual(expectedState);

    expectedState.successFlag = false;
    expectedState.formErrors = "Password error";

    expect(reducer(undefined, {
      type: types.DELETE_ACCOUNT,
      payload: {
        result: "error",
        errors: "Password error"
      }
    })).toEqual(expectedState);
  });
});