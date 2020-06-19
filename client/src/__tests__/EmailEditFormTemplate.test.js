import React from "react";
import { shallow } from "enzyme";
import { EmailEditFormTemplate } from "../components/EmailEditForm/EmailEditFormTemplate";

describe("EmailEditFormTemplate component", () => {
  let wrapper;
  const mockErrorsFunc = jest.fn();
  const mockSubmitFunc = jest.fn();
  const user = {
    id: 1,
    username: "admin"
  };
  beforeEach(() => {
    wrapper = shallow(<EmailEditFormTemplate
      editEmail={mockSubmitFunc}
      resetErrors={mockErrorsFunc}
      user={user}
    />, {
      disableLifecycleMethods: true
    });
  });
  afterEach(() => {
    mockSubmitFunc.mockClear();
    mockErrorsFunc.mockClear();
  });
  it("renders 2 form elements", () => {
    expect(wrapper.find(".form-element").length).toEqual(2);
  });
  it("renders form element of type 'password'", () => {
    expect(wrapper.find("input[type='password']").length).toEqual(1);
  });
  it("renders form element of type 'email'", () => {
    expect(wrapper.find("input[type='email']").length).toEqual(1);
  });
  it("default state values is correct", () => {
    expect(wrapper.state().password).toEqual("");
    expect(wrapper.state().newEmail).toEqual("");
    expect(wrapper.state().errors).toEqual(undefined);
  });
  it("does not render any errors by default", () => {
    expect(wrapper.exists(".form-errors > p")).toBeFalsy();
  });
  it("change password state value on input change", () => {
    wrapper.find("input[type='password']").simulate("change", { target: { id: "password", value: "123456" }});
    expect(wrapper.state().password).toEqual("123456");
  });
  it("change email state value on input change", () => {
    wrapper.find("input[type='email']").simulate("change", { target: { id: "newEmail", value: "somemail@google.com" }});
    expect(wrapper.state().newEmail).toEqual("somemail@google.com");
  });
  it("does not call resetErrors function on input change", () => {
    wrapper.find("input[type='password']").simulate("change", { target: { id: "password", value: "123456" }});
    expect(mockErrorsFunc.mock.calls.length).toEqual(0);
  });
  it("renders correct error message on form submit", () => {
    wrapper.find("form").simulate("submit", { preventDefault: () => {}});
    expect(wrapper.state().errors).toEqual("Email field must not be empty");
    expect(wrapper.find(".form-errors").text()).toEqual("Email field must not be empty");
  });
  it("renders correct error message on form submit with empty password field", () => {
    wrapper.find("input[type='email']").simulate("change", { target: { id: "newEmail", value: "somemail@google.com" }});
    wrapper.find("form").simulate("submit", { preventDefault: () => {}});
    expect(wrapper.state().errors).toEqual("Password field must not be empty");
    expect(wrapper.find(".form-errors").text()).toEqual("Password field must not be empty");
  });
  it("calls editEmail function with once on form submit", () => {
    wrapper.find("input[type='email']").simulate("change", { target: { id: "newEmail", value: "somemail@google.com" }});
    wrapper.find("input[type='password']").simulate("change", { target: { id: "password", value: "123456" }});
    wrapper.find("form").simulate("submit", { preventDefault: () => {}});
    expect(mockSubmitFunc.mock.calls.length).toEqual(1);
  });
  it("calls editEmail function with correct arguments", () => {
    wrapper.find("input[type='email']").simulate("change", { target: { id: "newEmail", value: "somemail@google.com" }});
    wrapper.find("input[type='password']").simulate("change", { target: { id: "password", value: "123456" }});
    wrapper.find("form").simulate("submit", { preventDefault: () => {}});
    expect(mockSubmitFunc).toHaveBeenLastCalledWith(
      {
        "new_password": "somemail@google.com",
        "password": "123456",
        "username": 1
      }
    );
  });
});