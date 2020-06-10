import React from "react";
import { shallow } from "enzyme";
import { PostCreateForm } from "../components/PostCreate/PostCreate";
import Dropdown from "../components/PostFormDropdown/PostFormDropdown";

describe("PostCreateForm component", () => {
  let wrapper;
  const user = {
    id: 1,
    user: "admin"
  };
  const subzeddits = [];
  const createPostMock = jest.fn();
  const resetErrorsMock = jest.fn();
  beforeEach(() => {
    wrapper = shallow(<PostCreateForm
      user={user}
      subzeddits={subzeddits}
      createPost={createPostMock}
      resetErrors={resetErrorsMock}
    />);
  });
  afterEach(() => {
    createPostMock.mockClear();
    resetErrorsMock.mockClear();
  });
  it("renders 3 form elements", () => {
    expect(wrapper.find(".form-element").length).toEqual(3);
  });
  it("renders 2 input element with type 'text'", () => {
    expect(wrapper.find("input[type='text']").length).toEqual(2);
  });
  it("renders 1 textarea element", () => {
    expect(wrapper.find("textarea").length).toEqual(1);
  });
  it("does not render any errors by default", () => {
    expect(wrapper.exists(".form-errors > p")).toBeFalsy();
  });
  it("state values is correct by default", () => {
    expect(wrapper.state().title).toEqual("");
    expect(wrapper.state().content).toEqual("");
    expect(wrapper.state().subzeddit).toEqual("");
    expect(wrapper.state().subzedditsTitles).toEqual([]);
    expect(wrapper.state().errors).toEqual(undefined);
    expect(wrapper.state().dropdownActive).toEqual(false);
  });
  it("title state changes on input change", () => {
    wrapper.find("input#title").simulate("change", { target: { id: "title", value: "post title"}});
    expect(wrapper.state().title).toEqual("post title");
  });
  it("content state changes on input change", () => {
    wrapper.find("textarea#content").simulate("change", { target: { id: "content", value: "post content"}});
    expect(wrapper.state().content).toEqual("post content");
  });
  it("subzeddit state changes on input change", () => {
    wrapper.find("input#subzeddit").simulate("change", { target: { value: "subzeddit title" }});
    expect(wrapper.state().subzeddit).toEqual("subzeddit title");
  });
  it("changes dropdown state on focus event", () => {
    wrapper.find("input#subzeddit").simulate("focus", { preventDefault: () => {}});
    expect(wrapper.state().dropdownActive).toEqual(true);
  });
  it("createPost and resetErrors functions are called once on submit", () => {
    wrapper.find("input#title").simulate("change", { target: { id: "title", value: "post title"}});
    wrapper.find("textarea#content").simulate("change", { target: { id: "content", value: "post content"}});
    wrapper.find("input#subzeddit").simulate("change", { target: { value: "subzeddit title" }});
    wrapper.find("form.post-form").simulate("submit", { preventDefault: () => {}});
    expect(createPostMock.mock.calls.length).toEqual(1);
    expect(resetErrorsMock.mock.calls.length).toEqual(1);
  });
  it("createPost function is called with correct arguments", () => {
    wrapper.find("input#title").simulate("change", { target: { id: "title", value: "post title"}});
    wrapper.find("textarea#content").simulate("change", { target: { id: "content", value: "post content"}});
    wrapper.find("input#subzeddit").simulate("change", { target: { value: "subzeddit title" }});
    wrapper.find("form.post-form").simulate("submit", { preventDefault: () => {}});
    expect(createPostMock).toHaveBeenCalledWith(
      1, {
        "title": "post title",
        "content": "post content",
        "subzeddit": "subzeddit title"
      }
    );
  });
});

describe("PostCreateForm component with errors and subzedditsTitles", () => {
  let wrapper;
  const user = {
    id: 1,
    user: "admin"
  };
  const subzeddits = [
    {
      title: "Subzeddit"
    },
    {
      title: "ForumBlog"
    },
    {
      title: "AnotherSubzeddit"
    }
  ];
  const errors = "This is error message";
  const currentSubzeddit = "Subzeddit";
  const createPostMock = jest.fn();
  const resetErrorsMock = jest.fn();
  beforeEach(() => {
    wrapper = shallow(<PostCreateForm
      user={user}
      subzeddits={subzeddits}
      currentSubzeddit={currentSubzeddit}
      errors={errors}
      createPost={createPostMock}
      resetErrors={resetErrorsMock}
    />);
  });
  afterEach(() => {
    createPostMock.mockClear();
    resetErrorsMock.mockClear();
  });
  it("renders errors by default", () => {
    expect(wrapper.find(".form-errors").text()).toEqual("This is error message");
  });
  it("subzedditsTitles state is correct", () => {
    expect(wrapper.state().subzedditsTitles).toEqual(subzeddits);
  });
  it("calls resetErrors once on input change", () => {
    wrapper.find("input#title").simulate("change", { target: { id: "title", value: "post title"}});
    expect(resetErrorsMock.mock.calls.length).toEqual(1);
  });
  it("calls resetErrors once on subzeddit input change", () => {
    wrapper.find("input#subzeddit").simulate("change", { target: { id: "subzeddit", value: "subzeddit title"}});
    expect(resetErrorsMock.mock.calls.length).toEqual(1);
  });
  it("changes subzedditsTitles state on subzeddit input focus", () => {
    wrapper.find("input#subzeddit").simulate("focus", { preventDefault: () => {}});
    expect(wrapper.state().subzedditsTitles).toEqual([
      {
        title: "Subzeddit"
      },
      {
        title: "AnotherSubzeddit"
      }
    ]);
  });
  it("changes subzedditsTitle state on subzeddit input change", () => {
    wrapper.find("input#subzeddit").simulate("change", { target: { id: "subzeddit", value: "Blog"}});
    expect(wrapper.state().subzedditsTitles).toEqual([{ title: "ForumBlog" }]);
  });
});