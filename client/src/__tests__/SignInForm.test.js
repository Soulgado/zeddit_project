import React from "react";
import { shallow } from "enzyme";
import { SignInForm } from "../components/SignIn/SignInForm";

describe("SignInForm component", () => {
  let wrapper;
  const signInMock = jest.fn();
  const resetErrorsMock = jest.fn();
  beforeEach(() => {
    wrapper = shallow(<SignInForm signIn={signInMock} resetErrors={resetErrorsMock} />);
  });
  afterEach(() => {
    signInMock.mockClear();
    resetErrorsMock.mockClear();
  });
  it("renders 2 form elements", () => {
    expect(wrapper.find(".form-element").length).toEqual(2);
  });
  it("renders 1 input element with type 'text'", () => {
    expect(wrapper.find("input[type='text']").length).toEqual(1);
  });
  it("renders 1 input element of type 'password'", () => {
    expect(wrapper.find("input[type='password'").length).toEqual(1);
  });
  it("submit button has sign-in-button class", () => {
    expect(wrapper.exists("button.sign-in-button")).toBeTruthy();
  });
  it("doesn't render errors if there are none", () => {
    expect(wrapper.exists(".form-errors > p")).toBeFalsy();
  });
  it("default state values are correct", () => {
    expect(wrapper.state().username).toEqual("");
    expect(wrapper.state().password).toEqual("");
    expect(wrapper.state().errors).toEqual(undefined);
  });
  it("username state value changes on input change", () => {
    wrapper.find("input#username").simulate("change", { target: { id: "username", value: "admin" }});
    expect(wrapper.state().username).toEqual("admin");
  });
  it("password state value changes on input change", () => {
    wrapper.find("input#password").simulate("change", { target: { id: "password", value: "qwerty" }});
    expect(wrapper.state().password).toEqual("qwerty");
  });
  it("doesn't call resetErrors function if errors props is false", () => {
    wrapper.find("input#username").simulate("change", { target: { id: "username", value: "admin" }});
    expect(resetErrorsMock.mock.calls.length).toEqual(0);
  });
  it("sets errors state to correct value if there is error in form", () => {
    wrapper.find("form").sumulate("submit", { preventDefault: () => {} });
    expect(wrapper.state().errors).toEqual("Username field must not be empty");
  }); 
  it("doesn't call signIn function if there is an error in the form", () => {
    wrapper.find("form").simulate("submit", { preventDefault: () => {} });
    expect(signInMock.mock.calls.length).toEqual(0);
  });
  it("calls singIn function with correct arguments on submit", () => {
    wrapper.find("input#username").simulate("change", { target: { id: "username", value: "admin" }});
    wrapper.find("input#password").simulate("change", { target: { id: "password", value: "qwerty" }});
    wrapper.find("form").simulate("submit", { preventDefault: () => {} });
    expect(signInMock).toHaveBeenCalledWith({
      "username": "admin",
      "password": "qwerty"
    });
  });
  it("calls resetErrors function once on submit", () => {
    wrapper.find("input#username").simulate("change", { target: { id: "username", value: "admin" }});
    wrapper.find("input#password").simulate("change", { target: { id: "password", value: "qwerty" }});
    wrapper.find("form").simulate("submit", { preventDefault: () => {} });
    expect(resetErrorsMock.mock.calls.length).toEqual(1);
  });
});