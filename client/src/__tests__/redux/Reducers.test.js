import * as types from "../../redux/types";
import * as loadingReducer from "../../redux/reducers/loadingReducers";
import * as postReducer from "../../redux/reducers/postReducers";

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