import React from "react";
import { shallow, mount } from "enzyme";
import { PostPage } from "../components/PostPage/PostPage";
import { CommentCreateForm } from "../components/CommentCreate/CommentCreate";

describe("PostPage component, current user is not creator", () => {
  let wrapper;
  const user = {
    id: 1,
    username: "admin"
  };
  const post = {
    id: 3, 
    title: "Post title",
    content: "Post content",
    username: "some_user",
    updated: false,
    type: "text",
    comments: []
  };
  const deletePostMock = jest.fn();
  beforeEach(() => {
    wrapper = shallow(<PostPage
      post={post}
      user={user}
      deletePost={deletePostMock}
      loggedIn={true}
    />);
  });
  afterEach(() => {
    deletePostMock.mockClear();
  });
  it("renders correct post title", () => {
    expect(wrapper.find("h2").text()).toEqual("Post title");
  });
  it("renders correct post info", () => {
    expect(wrapper.find(".post-info > p").text()).toEqual(
      "Posted by u/some_user <CreationTime />"
    );
  });
  it("renders correct post content", () => {
    expect(wrapper.find(".post-content p").text()).toEqual("Post content")
  });
  it("doesn't render post control buttons for the wrong user", () => {
    expect(wrapper.exists(".post-control-buttons")).toBeFalsy();
  });
});

describe("PostPage component, current user is creator", () => {
  let wrapper;
  const user = {
    id: 1,
    username: "admin"
  };
  const post = {
    id: 3, 
    title: "Post title",
    content: "Post content",
    username: "admin",
    updated: false,
    type: "text"
  };
  const deletePostMock = jest.fn();
  beforeEach(() => {
    wrapper = shallow(<PostPage
      post={post}
      user={user}
      deletePost={deletePostMock}
      loggedIn={true}
    />);
  });
  afterEach(() => {
    deletePostMock.mockClear();
  });
  it("calls deletePost once on click on delete button", () => {
    wrapper.find(".delete-button").simulate("click");
    expect(deletePostMock.mock.calls.length).toEqual(1);
  });
  it("calls deletePost with correct arguments", () => {
    wrapper.find(".delete-button").simulate("click");
    expect(deletePostMock).toHaveBeenCalledWith(1, 3);
  });
});