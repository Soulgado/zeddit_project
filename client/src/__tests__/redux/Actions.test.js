import configureStore from "redux-mock-store";
import apiMiddleware from "../../redux/apiMiddleware";
import * as actions from "../../redux/actionCreators";
import * as types from "../../redux/types";
import fetchMock from "fetch-mock";

const middlewares = [apiMiddleware];
const mockStore = configureStore(middlewares);
const headers = { "content-type" : "application/json" };

describe("testing correct returning values of actions", () => {
  it("createAccount action returns correct object", () => {
    const formData = {
      user: "admin",
      password: "admin"
    };

    const body = JSON.stringify(formData);

    const expectedResult = {
      type: types.CREATE_ACCOUNT,
      payload: "",
      meta: {
        type: "api",
        method: "POST",
        url: "api/users/register",
        body,
        headers: {
          "Content-Type": "application/json",
        },
        loading: true,
      },
    };

    const actualResult = actions.createAccount(formData);
    expect(actualResult).toEqual(expectedResult);
  });

  it("resetRegistrationSuccess returns correct object", () => {
    const expectedResult = {
      type: types.RESET_REGISTRATION_SUCCESS,
      payload: null,
    };

    const actualResult = actions.resetRegistrationSuccess();
    expect(actualResult).toEqual(expectedResult);
  });

  it("login returns correct object", () => {
    const formData = {
      user: "admin",
      password: "admin"
    };

    const body = JSON.stringify(formData);

    const expectedResult = {
      type: types.LOGIN,
      payload: "",
      meta: {
        type: "api",
        url: "/api/users/signin",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
        loading: true,
      },
    };

    const actualResult = actions.login(formData);
    expect(actualResult).toEqual(expectedResult);
  });

  it("logout returns correct object", () => {
    const expectedResult = {
      type: types.LOGOUT
    };

    const actualResult = actions.logout();
    expect(actualResult).toEqual(expectedResult);
  });

  it("resetUserFormErrors returns correct object", () => {
    const expectedResult = {
      type: types.RESET_USER_FORM_ERRORS
    };

    const actualResult = actions.resetUserFormErrors();
    expect(actualResult).toEqual(expectedResult);
  });

  it("createSubzeddit returns correct object", () => {
    const formData = {
      title: "subzeddit",
      description: "some description"
    };

    const body = JSON.stringify(formData);

    const expectedResult = {
      type: types.CREATE_SUBZEDDIT,
      payload: 0,
      meta: {
        type: "api",
        loading: true,
        url: "/api/sz",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      },
    };

    const actualResult = actions.createSubzeddit(formData);
    expect(actualResult).toEqual(expectedResult);
  });

  it("resetSubzedditFormErrors returns correct object", () => {
    const expectedResult = {
      type: types.RESET_SUBZEDDIT_FORM_ERRORS
    };

    const actualResult = actions.resetSubzedditFormErrors();
    expect(actualResult).toEqual(expectedResult);
  });

  it("resetCreationSuccess returns correct object", () => {
    const expectedResult = {
      type: types.RESET_CREATION_SUCCESS
    };

    const actualResult = actions.resetCreationSuccess();
    expect(actualResult).toEqual(expectedResult);
  });

  it("getSubzedditsList returns correct object", () => {
    const expectedResult = {
      type: types.GET_SUBZEDDITS,
      payload: 0,
      meta: {
        type: "api",
        loading: true,
        url: "/api/sz/list?user=1234",
      },
    };

    const user = {
      id: "1234"
    };

    const actualResult = actions.getSubzedditsList(user);
    expect(actualResult).toEqual(expectedResult);
  });

  it("getSubzedditTitles returns correct object", () => {
    const expectedResult = {
      type: types.GET_SUBZEDDITS_TITLES,
      meta: {
        type: "api",
        url: "/api/sz/get_titles",
      },
    };

    const actualResult = actions.getSubzedditTitles();
    expect(actualResult).toEqual(expectedResult);
  });

  it("getUserSubscriptions returns correct object", () => {
    const expectedResult = {
      type: types.GET_USER_SUBSCRIPTIONS,
      meta: {
        type: "api",
        url: `/api/users/1234/subscriptions`,
      },
    };

    const actualResult = actions.getUserSubscriptions({ id: "1234" });
    expect(actualResult).toEqual(expectedResult);
  });

  it("changeSubscriptionStatus returns correct object", () => {
    const formData = {
      user: "user",
      subzeddit: "subzeddit"
    };

    const body = JSON.stringify(formData);

    const expectedResult = {
      type: types.CHANGE_SUBSCRIPTION_STATUS,
      meta: {
        type: "api",
        method: "POST",
        body,
        url: "/api/users/unsub_from_subzeddit",
        headers: {
          "Content-Type": "application/json",
        },
      },
    };

    const actualResult = actions.changeSubscriptionStatus("user", "subzeddit", true);
    expect(actualResult).toEqual(expectedResult);
  });

  it("getUpvotedPosts returns correct object", () => {
    const expectedResult = {
      type: types.GET_USER_UPVOTED_POSTS,
      meta: {
        type: "api",
        loading: true,
        url: `/api/users/1234/upvoted`,
      },
    };

    const actualResult = actions.getUpvotedPosts({ id: "1234" });
    expect(actualResult).toEqual(expectedResult);
  });

  it("getDownvotedPosts returns correct object", () => {
    const expectedResult = {
      type: types.GET_USER_DOWNVOTED_POSTS,
      meta: {
        type: "api",
        loading: true,
        url: `/api/users/1234/downvoted`,
      },
    };

    const actualResult = actions.getDownvotedPosts({ id: "1234" });
    expect(actualResult).toEqual(expectedResult);
  });

  it("resetPostDeleteFlag returns correct object", () => {
    const expectedResult = {
      type: types.RESET_POST_DELETE_FLAG
    };

    const actualResult = actions.resetPostDeleteFlag();
    expect(actualResult).toEqual(expectedResult);
  });

  it("editUsername returns correct object", () => {
    const formData = {
      user: "user",
      newUsername: "new_user"
    };

    const body = JSON.stringify(formData);

    const expectedResult = {
      type: types.UPDATE_USERNAME,
      meta: {
        type: "api",
        url: "/api/users/update_username",
        method: "PUT",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      },
    };

    const actualResult = actions.editUsername(formData);
    expect(actualResult).toEqual(expectedResult);
  });

  it("editPassword returns correct object", () => {
    const formData = {
      user: "user",
      newPassword: "new_pass"
    };

    const body = JSON.stringify(formData);

    const expectedResult = {
      type: types.UPDATE_PASSWORD,
      meta: {
        type: "api",
        url: "/api/users/update_password",
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      },
    };

    const actualResult = actions.editPassword(formData);
    expect(actualResult).toEqual(expectedResult);
  });

  it("deleteAccount returns correct object", () => {
    const expectedResult = {
      type: types.DELETE_ACCOUNT,
      meta: {
        type: "api",
        url: "/api/users/delete_user",
        method: "DELETE",
        body: JSON.stringify({ username: "user", password: "12345678"}),
        headers: {
          "Content-Type": "application/json",
        },
      },
    };

    const actualResult = actions.deleteAccount("user", "12345678");
    expect(actualResult).toEqual(expectedResult);
  });

  it("getSubmittedPosts returns correct object", () => {
    const expectedResult = {
      type: types.GET_SUBMITTED_POSTS,
      meta: {
        type: "api",
        loading: true,
        url: `/api/users/1234/created_posts`,
      },
    };

    const actualResult = actions.getSubmittedPosts({ id: "1234" });
    expect(actualResult).toEqual(expectedResult);
  });

  it("editEmail returns correct object", () => {
    const formData = {
      user: "user",
      email: "some@mail.com"
    };

    const expectedResult = {
      type: types.UPDATE_EMAIL,
      meta: {
        type: "api",
        url: "/api/users/update_email",
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      },
    };

    const actualResult = actions.editEmail(formData);
    expect(actualResult).toEqual(expectedResult);
  });
});

describe("testing async actions", () => {
  let store;
  beforeEach(() => {
    store = mockStore();
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it("calls actions in correct order on CREATE_ACCOUNT action", () => {
    fetchMock.postOnce("/api/users/register", {
      body: { 
        "result": "success", 
      },
      headers
    });

    const expectedActions = [
      { type: types.LOADING },
      { type: types.END_LOADING },
      { type: types.CREATE_ACCOUNT, payload: { "result": "success" }}
    ];

    return store.dispatch(actions.createAccount()).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });

  it("calls actions in correct order on LOGIN action", () => {
    fetchMock.postOnce("/api/users/signin", {
      body: {
        "result": "success",
        "user": {
          token: "some-token",
          username: "user"
        }
      },
      headers
    });

    const expectedActions = [
      { type: types.LOADING },
      { type: types.END_LOADING },
      { type: types.LOGIN, payload: {
        "result": "success",
        "user": {
          token: "some-token",
          username: "user"
        }
      }}
    ];

    return store.dispatch(actions.login()).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });

  it("calls actions in correct order in CREATE_SUBZEDDIT action", () => {
    fetchMock.postOnce("/api/sz", {
      body: {
        "result": "success",
        "data": {
          "subzeddit": "A New Subzeddit"
        }
      },
      headers
    });

    const expectedActions = [
      { type: types.LOADING },
      { type: types.END_LOADING },
      { type: types.CREATE_SUBZEDDIT, 
        payload: {
          "result": "success",
          "data": {
            "subzeddit": "A New Subzeddit"
          }
        }
      }
    ]

    return store.dispatch(actions.createSubzeddit()).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });

  it("calls actions in the correct order in GET_SUBZEDDITS actions", () => {
    const payload = {
      "result": "success",
      "subzeddits": [
        "one subzeddit",
        "two subzeddit"
      ],
    }

    fetchMock.getOnce("/api/sz/list?user=", {
      body: payload,
      headers
    });

    const expectedActions = [
      { type: types.LOADING },
      { type: types.END_LOADING },
      { type: types.GET_SUBZEDDITS,
        payload
      }
    ];

    return store.dispatch(actions.getSubzedditsList()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("calls actions in the correct order in GET_SUBZEDDIT_POSTS action", () => {
    const payload = {
      "result": "success",
      "posts": [
        "one post",
        "two post"
      ]
    };

    fetchMock.getOnce("/api/sz/title/posts?user=&page=1", {
      body: payload,
      headers
    });

    const expectedActions = [
      { type: types.LOADING },
      { type: types.END_LOADING },
      { type: types.GET_SUBZEDDIT_POSTS, 
        payload
      }
    ];

    return store.dispatch(actions.getSubzedditPosts("title", "", "1")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("calls actions in the correct order in GET_SUBZEDDIT_TITLES action", () => {
    const payload = {
      "result": "success",
      "titles": [ "first title", "second title" ]
    };

    fetchMock.getOnce("/api/sz/get_titles", {
      body: payload,
      headers
    });

    const expectedActions = [
      { type: types.GET_SUBZEDDITS_TITLES,
        payload
      }
    ];

    return store.dispatch(actions.getSubzedditTitles()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
})