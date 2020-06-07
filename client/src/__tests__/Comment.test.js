import React from "react";
import { shallow } from "enzyme";
import { Comment } from "../components/Comment/Comment";

// ToDo: create mocks
describe("Comment component with logged user, not author of the comment", () => {
  let wrapper;
  let customProps = {
    user: {
      id: 1,
      username: "admin",
    },
    loggedIn: true,
    post: {},
    comment: {
      id: 1,
      author: 2,
      username: "user",
      updated: false,
      content: "Content of the comment",
      creation_time: new Date(),
    },
  };
  beforeEach(() => {
    wrapper = shallow(<Comment {...customProps} />);
  });
  it("renders general wrappers for the comment", () => {
    expect(wrapper.exists(".comment-body")).toBeTruthy();
    expect(wrapper.exists(".comment-main")).toBeTruthy();
  });
  it("renders right comments info", () => {
    expect(wrapper.find(".comment-info span").text()).toEqual(
      "user - posted <CreationTime />"
    );
  });
  it("comment state variables has right values by default", () => {
    expect(wrapper.state().createFormActive).toBeFalsy();
    expect(wrapper.state().editFormActive).toBeFalsy();
    expect(wrapper.state().commentText).toEqual("Content of the comment");
  });
  it("comment has one button for reply", () => {
    expect(wrapper.find(".comment-buttons button").length).toEqual(1);
  });
  it("comment content is rendered correctly", () => {
    expect(wrapper.find(".comment-content").text()).toEqual(
      "Content of the comment"
    );
  });
  it("component changes state on click on reply", () => {
    wrapper.find(".comment-create-button").simulate("click");
    expect(wrapper.state().createFormActive).toBeTruthy();
    wrapper.find(".comment-create-button").simulate("click");
    expect(wrapper.state().createFormActive).toBeFalsy();
  });
  it("component renders correct text on reply button", () => {
    expect(wrapper.find(".comment-create-button").text()).toEqual("Reply");
    wrapper.find(".comment-create-button").simulate("click");
    expect(wrapper.find(".comment-create-button").text()).toEqual("Hide");
    wrapper.find(".comment-create-button").simulate("click");
    expect(wrapper.find(".comment-create-button").text()).toEqual("Reply");
  });
});

describe("Comment component with logged user, author of the comment", () => {
  let wrapper;
  let customProps = {
    user: {
      id: 1,
      username: "admin",
    },
    loggedIn: true,
    post: {},
    comment: {
      id: 1,
      author: 1,
      username: "admin",
      updated: false,
      content: "Content of the comment",
      creation_time: new Date(),
    },
  };
  beforeEach(() => {
    wrapper = shallow(<Comment {...customProps} />);
  });
  it("component renders 3 buttons: reply, edit, delete", () => {
    expect(wrapper.find(".comment-buttons button").length).toEqual(3);
  });
  it("edit buttons renders correct text", () => {
    expect(wrapper.find(".comment-edit-button").text()).toEqual("Edit");
    wrapper.find(".comment-edit-button").simulate("click");
    expect(wrapper.find(".comment-edit-button").text()).toEqual(
      "Apply changes"
    );
  });
  it("component renders textarea after click on edit button", () => {
    wrapper.find(".comment-edit-button").simulate("click");
    expect(wrapper.exists(".comment-content textarea")).toBeTruthy();
  });
});

describe("Comment component with logged out user", () => {
  let wrapper;
  let customProps = {
    user: undefined,
    loggedIn: false,
    post: {},
    comment: {
      id: 1,
      author: 1,
      username: "admin",
      updated: false,
      content: "Content of the comment",
      creation_time: new Date(),
    },
  };
  beforeEach(() => {
    wrapper = shallow(<Comment {...customProps} />);
  });
  it("component does not render any comment buttons", () => {
    expect(wrapper.find(".comment-buttons button").length).toEqual(0);
  });
});
