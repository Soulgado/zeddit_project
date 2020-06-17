import React from "react";
import { shallow } from "enzyme";
import { SubzedditCreateForm } from "../components/SubzedditCreate/SubzedditCreate";

describe("SubzedditCreateForm component", () => {
  let wrapper;
  const createSubzedditMock = jest.fn();
  const resetErrorsMock = jest.fn();
  const user = {
    id: 1,
    username: "admin"
  };
  beforeEach(() => {
    wrapper = shallow(<SubzedditCreateForm
      user={user}
      createSubzeddit={createSubzedditMock}
      resetErrors={resetErrorsMock}
    />);
  });
  afterEach(() => {
    createSubzedditMock.mockClear();
    resetErrorsMock.mockClear();
  });
  it("renders two form-elements", () => {
    expect(wrapper.find(".form-element").length).toEqual(2);
  });
  it("renders one input element with type 'text'", () => {
    expect(wrapper.find("input[type='text']").length).toEqual(1);
  });
  it("renders one textarea element", () => {
    expect(wrapper.find("textarea").length).toEqual(1);
  });
  it("doesn't render error by default", () => {
    expect(wrapper.exists(".form-errors > p")).toBeFalsy();
  });
  it("default state values are correct by default", () => {
    expect(wrapper.state().title).toEqual("");
    expect(wrapper.state().description).toEqual("");
    expect(wrapper.state().errors).toEqual(undefined);
  });
  it("changes 'title' state on input change", () => {
    wrapper.find("input#title").simulate("change", { target: { id: "title" , value: "Some title" }});
    expect(wrapper.state().title).toEqual("Some title");
  });
  it("changes 'description' state on input change", () => {
    wrapper.find("textarea#description").simulate("change", { target: { id: "description", value: "Some description" }});
    expect(wrapper.state().description).toEqual("Some description");
  });
  it("doesn't not call resetErrors function on change by default", () => {
    wrapper.find("input#title").simulate("change", { target: { id: "title" , value: "Some title" }});
    expect(resetErrorsMock.mock.calls.length).toEqual(0);
  });
  it("changes 'errors' state to correct value if there is an error in form on submit", () => {
    wrapper.find("input#title").simulate("change", { target: { id: "title" , value: "ab" }});
    wrapper.find("form").simulate("submit", { preventDefault: () => {} });
    expect(wrapper.state().errors).toEqual("Title must be no less than 3 characters long");
  });
  it("calls createSubzeddit function with correct arguments on submit", () => {
    wrapper.setState({
      title: "Some title",
      description: "Some description"
    });
    wrapper.find("form").simulate("submit", { preventDefault: () => {} });
    expect(createSubzedditMock).toHaveBeenCalledWith(
      {
        "user": 1,
        "title": "Some title",
        "description": "Some description"
      }
    );
  });
  it("doesn't call createSubzeddit, if there are errors in the form", () => {
    wrapper.find("input#title").simulate("change", { target: { id: "title" , value: "ab" }});
    wrapper.find("form").simulate("submit", { preventDefault: () => {} });
    expect(createSubzedditMock.mock.calls.length).toEqual(0);
  });
  it("calls resetErrors on unmount", () => {
    wrapper.unmount();
    expect(resetErrorsMock.mock.calls.length).toEqual(1);
  });
});