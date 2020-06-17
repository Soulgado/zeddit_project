import React from "react";
import { shallow } from "enzyme";
import { UsernameEditFormTemplate } from "../components/UsernameEditForm/UsernameEditFormTemplate";

describe("UsernameEditFormTemplate component", () => {
  let wrapper;
  const user = {
    id: 1,
    username: "admin"
  };
  const editUsernameMock = jest.fn();
  const resetErrorsMock = jest.fn();
  beforeEach(() => {
    wrapper = shallow(<UsernameEditFormTemplate
      user={user}
      editUsername={editUsernameMock}
      resetErrors={resetErrorsMock}
    />);
  });
  afterEach(() => {
    editUsernameMock.mockClear();
    resetErrorsMock.mockClear();
  });
  it("renders 2 form-elements", () => {
    expect(wrapper.find(".form-elements").length).toEqual(2);
  });
  it("renders 1 input element of type 'password'", () => {
    expect(wrapper.find("input[type='password']").length).toEqual(1);
  });
  it("renders 1 input element of type 'text'", () => {
    expect(wrapper.find("input[type='text']").length).toEqual(1);
  });
  it("doesn't render errors by default", () => {
    expect(wrapper.exists(".form-errors > p")).toBeFalsy();
  });
  it("default state values are correct", () => {
    expect(wrapper.state().newUsername).toEqual("");
    expect(wrapper.state().password).toEqual("");
    expect(wrapper.state().errors).toEqual(undefined);
  });
  it("changes 'username' state on input change", () => {
    wrapper.find("input#newUsername").simulate("change", { target: { id: "newUsername", value: "admin" }});
    expect(wrapper.state().newUsername).toEqual("admin");
  });
  it("changes 'password' state on input change", () => {
    wrapper.find("input#password").simulate("change", { target: { id: "password", value: "qwerty" }});
    expect(wrapper.state().password).toEqual("qwerty");
  });
  it("doesn't call resetErrors function on change by default", () => {
    wrapper.find("input#newUsername").simulate("change", { target: { id: "newUsername", value: "admin" }});
    expect(resetErrorsMock.mock.calls.length).toEqual(0);
  });
  it("changes 'errors' state to correct value if there is an error in form on submit", () => {
    wrapper.setState({
      newUsername: "aa"
    });
    wrapper.find("form").simulate("submit", { preventDefault: () => {} });
    expect(wrapper.state().errors).toEqual("Username must not be less than 3 characters long");
  });
  it("editUsername function should not be called if there is an error in the form", () => {
    wrapper.setState({
      newUsername: "aa"
    });
    wrapper.find("form").simulate("submit", { preventDefault: () => {} });
    expect(editUsernameMock.mock.calls.length).toEqual(0);
  });
  it("calls editUsername function with correct arguments on submit", () => {
    wrapper.setState({
      newUsername: "new_admin",
      password: "qwerty"
    });
    wrapper.find("form").simulate("submit", { preventDefault: () => {} });
    expect(editUsernameMock).toHaveBeenCalledWith({
      username: "admin",
      password: "qwerty",
      new_username: "new_admin"
    });
  });
  it("calls resetErrors function on correct form submit", () => {
    wrapper.setState({
      newUsername: "new_admin",
      password: "qwerty"
    });
    wrapper.find("form").simulate("submit", { preventDefault: () => {} });
    expect(resetErrorsMock.mock.calls.length).toEqual(1);
  });
  it("calls resetErrors function on component unmount", () => {
    wrapper.unmount();
    expect(resetErrorsMock.mock.calls.length).toEqual(1);
  });
});