import React from "react";
import { shallow } from "enzyme";
import { TextPostEditPage } from "../components/PostEditPage/TextPostEditPage";

describe("TextPostEditPage component", () => {
  let wrapper;
  const user = {
    id: 1,
    username: "admin"
  };
  const post = {
    id: 3,
    title: "Post title",
    content: "Post content"
  };
  const editPostMock = jest.fn();
  const resetErrorsMock = jest.fn();
  beforeEach(() => {
    wrapper = shallow(<TextPostEditPage
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
  it("renders two form elements", () => {
    expect(wrapper.find(".form-element").length).toEqual(2);
  });
  it("renders two input elements with type 'text'", () => {
    expect(wrapper.find("input[type='text']").length).toEqual(2);
  });
  it("sets state to correct values on mount", () => {
    expect(wrapper.state().title).toEqual("Post title");
    expect(wrapper.state().content).toEqual("Post content");
  });
  it("doesn't call resetErrors function on input change if errors props is false", () => {
    wrapper.find("input").at(0).simulate("change", { target: { id: "title", value: "New Title" }});
    expect(resetErrorsMock.mock.calls.length).toEqual(0);
  });
  it("changes title state value on input change", () => {
    wrapper.find("input").at(0).simulate("change", { target: { id: "title", value: "New Title" }});
    expect(wrapper.state().title).toEqual("New Title");
  });
  it("changes content state value on input change", () => {
    wrapper.find("input").at(1).simulate("change", { target: { id: "content", value: "New content" }});
    expect(wrapper.state().content).toEqual("New content");
  });
  it("calls editPost function once on submit", () => {
    wrapper.find("form").simulate("submit", { preventDefault: () => {}});
    expect(editPostMock.mock.calls.length).toEqual(1);
  });
  it("calls editPost with correct arguments on submit", () => {
    wrapper.find("input").at(0).simulate("change", { target: { id: "title", value: "New Title" }});
    wrapper.find("input").at(1).simulate("change", { target: { id: "content", value: "New content" }});
    wrapper.find("form").simulate("submit", { preventDefault: () => {}});
    expect(editPostMock).toHaveBeenCalledWith(
      1,
      3, {
      "title": "New Title",
      "content": "New content"
    });
  });
  it("calls resetErrors once on submit", () => {
    wrapper.find("form").simulate("submit", { preventDefault: () => {}});
    expect(resetErrorsMock.mock.calls.length).toEqual(1);
  });
  it("calls resetErrors once on unmount", () => {
    wrapper.unmount();
    expect(resetErrorsMock.mock.calls.length).toEqual(1);
  });
});