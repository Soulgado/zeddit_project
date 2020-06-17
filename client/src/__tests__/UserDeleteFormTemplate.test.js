import React from "react";
import { shallow } from "enzyme";
import { UserDeleteFormTemplate } from "../components/UserDeleteForm/UserDeleteFormTemplate";

describe("UserDeleteFormTemplate component", () => {
  let wrapper;
  const user = {
    id: 1,
    username: "admin"
  };
  const deleteAccountMock = jest.fn();
  const resetErrorsMock = jest.fn();
  beforeEach(() => {
    wrapper = shallow(<UserDeleteFormTemplate
      user={user}
      deleteAccount={deleteAccountMock}
      resetErrors={resetErrorsMock}
    />);
  });
  afterEach(() => {
    deleteAccountMock.mockClear();
    resetErrorsMock.mockClear();
  });
  it("renders 3 form elements", () => {
    expect(wrapper.find(".form-element").length).toEqual(3);
  });
  it("renders 1 input element of type 'text'", () => {
    expect(wrapper.find("input[type='text']").length).toEqual(1);
  });
  it("renders 2 input elements of type 'password'", () => {
    expect(wrapper.find("input[type='password']").length).toEqual(2);
  });
  it("doesn't render any errors by default", () => {
    expect(wrapper.exists(".form-errors > p")).toBeFalsy();
  });
  it("default state values are correct", () => {
    expect(wrapper.state().username).toEqual("");
    expect(wrapper.state().password).toEqual("");
    expect(wrapper.state().confPassword).toEqual("");
  });
  it("changes 'username' state on input change", () => {
    wrapper.find("input#username").simulate("change", { target: { id: "username", value: "admin" }});
    expect(wrapper.state().username).toEqual("admin");
  });
  it("changes 'password' state on input change", () => {
    wrapper.find("input#password").simulate("change", { target: { id: "password", value: "qwerty" }});
    expect(wrapper.state().password).toEqual("qwerty");
  });
  it("changes 'confPassword' state on input change", () => {
    wrapper.find("input#confPassword").simulate("change", { target: { id: "confPassword", value: "asdfgh" }});
    expect(wrapper.state().confPasswrord).toEqual("asdfgh");
  });
  it("doesn't call resetErrors function on input change by default", () => {
    wrapper.find("input#username").simulate("change", { target: { id: "username", value: "admin" }});
    expect(resetErrorsMock.mock.calls.length).toEqual(0);
  });
  it("calls deleteAccount with correct arguments on submit", () => {
    wrapper.setState({
      username: "admin",
      password: "qwerty",
      confPassword: "qwerty"
    });
    wrapper.find("form").simulate("submit", { preventDefault: () => {} });
    expect(deleteAccountMock).toHaveBeenCalledWith({
      "username": "admin",
      "password": "qwerty"
    });
  });
  it("calls resetErrors once on submit", () => {
    wrapper.setState({
      username: "admin",
      password: "qwerty",
      confPassword: "qwerty"
    });
    wrapper.find("form").simulate("submit", { preventDefault: () => {} });
    expect(resetErrorsMock.mock.calls.length).toEqual(1);
  });
});