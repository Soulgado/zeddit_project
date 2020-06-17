import React from "react";
import { shallow } from "enzyme";
import { ImagePostEditPage } from "../components/PostEditPage/ImagePostEditPage";

describe("ImagePostEditPage", () => {
  let wrapper;
  const user = {
    id: 1,
    username: "admin"
  };
  const post = {
    id: 3,
    title: "Post title"
  };
  const resetErrorsMock = jest.fn();
  const editPostMock = jest.fn();
  beforeEach(() => {
    wrapper = shallow(<ImagePostEditPage
      user={user}
      post={post}
      resetErrors={resetErrorsMock}
      editPost={editPostMock}
    />);
  });
  afterEach(() => {
    resetErrorsMock.mockClear();
    editPostMock.mockClear();
  });
  it("renders one input element with type 'text'", () => {
    expect(wrapper.find("input[type='text']").length).toEqual(1);
  });
  it("doesn't render any errors by default", () => {
    expect(wrapper.exists(".form-errors > p")).toBeFalsy();
  });
  it("applies correct title state on mount", () => {
    expect(wrapper.state().title).toEqual("Post title");
  });
  it("correctly sets title state on input change", () => {
    wrapper.find("input#title").simulate("change", { target: { id: "title", value: "New post title"}});
    expect(wrapper.state().title).toEqual("New post title");
  });
  it("doesn't call resetErrors function on input change if props.errors is false", () => {
    wrapper.find("input#title").simulate("change", { target: { id: "title", value: "New post title"}});
    expect(resetErrorsMock.mock.calls.length).toEqual(0);
  });
  it("calls resetErrors on unmount", () => {
    wrapper.unmount();
    expect(resetErrorsMock.mock.calls.length).toEqual(1);
  });
});