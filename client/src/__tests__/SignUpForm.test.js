import React from "react";
import { shallow } from "enzyme";
import { SignUpForm } from "../components/SignUp/SignUpForm";

describe("SignUpForm component", () => {
  let wrapper;
  const signUpMock = jest.fn();
  const resetErrorsMock = jest.fn();
  beforeEach(() => {
    wrapper = shallow(<SignUpForm signUp={signUpMock} resetErrors={resetErrorsMock} />);
  });
  afterEach(() => {
    signUpMock.mockClear();
    resetErrorsMock.mockClear();
  });
  it("renders 4 form elements", () => {
    expect(wrapper.find(".form-element").length).toEqual(4);
  });
  it("renders 1 input element of type 'text'", () => {
    expect(wrapper.find("input[type='text']").length).toEqual(1);
  });
  it("renders 2 input elements of type 'password'", () => {
    expect(wrapper.find("input[type='password']").length).toEqual(2);
  });
  it("renders 1 input element of type 'email'", () => {
    expect(wrapper.find("input[type='email']").length).toEqual(1);
  });
  it("renders button with 'sign-up-button' class", () => {
    expect(wrapper.exists("button.sign-up-button")).toBeTruthy();
  });
  it("doesn't render errors by default", () => {
    expect(wrapper.exists(".form-errors > p")).toBeFalsy();
  });
  it("default state values are correct", () => {
    expect(wrapper.state().username).toEqual("");
    expect(wrapper.state().email).toEqual("");
    expect(wrapper.state().password).toEqual("");
    expect(wrapper.state().confPassword).toEqual("");
    expect(wrapper.state().errors).toEqual(undefined);
  });
  it("changes username state on input change", () => {
    wrapper.find("input#username").simulate("change", { target: { id: "username", value: "admin" }});
    expect(wrapper.state().username).toEqual("admin");
  });
  it("changes email state on input change", () => {
    wrapper.find("input#email").simulate("change", { target: { id: "email", value: "somemail@google.com" }});
    expect(wrapper.state().email).toEqual("somemail@google.com");
  });
  it("changes password state on input change", () => {
    wrapper.find("input#password").simulate("change", { target: { id: "password", value: "qwerty" }});
    expect(wrapper.state().password).toEqual("qwerty");
  });
  it("changes confPassword state on input change", () => {
    wrapper.find("input#confPassword").simulate("change", { target: { id: "confPassword", value: "qwerty" }});
    expect(wrapper.state().confPassword).toEqual("qwerty");
  });
  it("sets errors state to correct value if username is empty on submit", () => {
    wrapper.find("form").simulate("submit", { preventDefault: () => {}});
    expect(wrapper.state().errors).toEqual("Username field must not be empty");
  });
  it("sets errors state to correct value if username is less than 3 characters long", () => {
    wrapper.setState({
      username: "aa",
    });
    wrapper.find("form").simulate("submit", { preventDefault: () => {}});
    expect(wrapper.state().errors).toEqual("Username must not be less than 3 characters long");
  });
  it("sets errors state to correct value if username is more than 60 characters long", () => {
    wrapper.setState({
      username: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    });
    wrapper.find("form").simulate("submit", { preventDefault: () => {}});
    expect(wrapper.state().errors).toEqual("Username must not be more than 60 characters long");
  });
  it("sets errors state to correct value if email field is empty", () => {
    wrapper.setState({
      username: "admin",
    });
    wrapper.find("form").simulate("submit", { preventDefault: () => {}});
    expect(wrapper.state().errors).toEqual("Email field must not be empty");
  });
  it("sets errors state to correct value if password field is empty", () => {
    wrapper.setState({
      username: "admin",
      email: "somemail@google.com",
    });
    wrapper.find("form").simulate("submit", { preventDefault: () => {}});
    expect(wrapper.state().errors).toEqual("Password field must not be empty");
  });
  it("sets errors state to correct value if password is less than 5 characters long", () => {
    wrapper.setState({
      username: "admin",
      email: "somemail@google.com",
      password: "qwer"
    });
    wrapper.find("form").simulate("submit", { preventDefault: () => {}});
    expect(wrapper.state().errors).toEqual("Password must not be less than 5 characters long");
  });
  it("sets errors state to coorect value if password is not equal to confPassword state", () => {
    wrapper.setState({
      username: "admin",
      email: "somemail@google.com",
      password: "qwerty",
      confPassword: "asdfgh"
    });
    wrapper.find("form").simulate("submit", { preventDefault: () => {}});
    expect(wrapper.state().errors).toEqual("Passwords does not match");
  });
  it("signUp function is not called if there are errors in the form", () => {
    wrapper.setState({
      username: "admin",
      email: "somemail@google.com",
      password: "qwerty",
      confPassword: "asdfgh"
    });
    wrapper.find("form").simulate("submit", { preventDefault: () => {}});
    expect(signUpMock.mock.calls.length).toEqual(0);
  });
  it("signUp function is called with correct arguments on submit", () => {
    wrapper.setState({
      username: "admin",
      email: "somemail@google.com",
      password: "qwerty",
      confPassword: "qwerty"
    });
    wrapper.find("form").simulate("submit", { preventDefault: () => {}});
    expect(signUpMock).toHaveBeenCalledWith({
      "username": "admin",
      "email": "somemail@google.com",
      "password": "qwerty"
    });
  });
  it("calls resetErrors on unmount", () => {
    wrapper.unmount();
    expect(resetErrorsMock.mock.calls.length).toEqual(1);
  });
});