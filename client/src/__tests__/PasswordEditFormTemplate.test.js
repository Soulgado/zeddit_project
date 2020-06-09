import React from 'react';
import { shallow } from 'enzyme';
import { PasswordEditFormTemplate } from "../components/PasswordEditForm/PasswordEditFormTemplate";

describe("PasswordEditForm component", () => {
  let wrapper;
  const mockErrorsFunc = jest.fn();
  const mockSubmitFunc = jest.fn();
  const user = {
    id: 1,
    username: "admin"
  };
  beforeEach(() => {
    wrapper = shallow(<PasswordEditFormTemplate
      editPassword={mockSubmitFunc}
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
  it("renders 3 form elements", () => {
    expect(wrapper.find(".form-element").length).toEqual(3);
  });
  it("renders 2 form elements of type 'password'", () => {
    expect(wrapper.find("input[type='password']").length).toEqual(3);
  });
  it("default state values is correct", () => {
    expect(wrapper.state().password).toEqual("");
    expect(wrapper.state().confPassword).toEqual("");
    expect(wrapper.state().newPassword).toEqual("");
    expect(wrapper.state().errors).toEqual(undefined);
  });
  it("does not render any errors by default", () => {
    expect(wrapper.exists(".form-errors > p")).toBeFalsy();
  });
  it("change old password state value on change event", () => {
    wrapper.find("input#password").simulate("change", { target: { id: "password", value: "qwerty"}});
    expect(wrapper.state().password).toEqual("qwerty");
  });
  it("change new password state value on change event", () => {
    wrapper.find("input#newPassword").simulate("change", { target: { id: "newPassword", value: "qwerty"}});
    expect(wrapper.state().newPassword).toEqual("qwerty");
  });
  it("change confirm password state value on change event", () => {
    wrapper.find("input#confPassword").simulate("change", { target: { id: "confPassword", value: "qwerty"}});
    expect(wrapper.state().confPassword).toEqual("qwerty");
  });
  it("does not call resetErrors function on input change", () => {
    wrapper.find("input#password").simulate("change", { target: { id: "password", value: "123456" }});
    expect(mockErrorsFunc.mock.calls.length).toEqual(0);
  });
  it("renders correct error message on form submit", () => {
    wrapper.find("form").simulate("submit", { preventDefault: () => {}});
    expect(wrapper.find(".form-errors").text()).toEqual("Old password field must not be empty");
  });
  it("renders correct error message if passwords don't match", () => {
    wrapper.find("input#password").simulate("change", { target: { id: "password", value: "123456" }});
    wrapper.find("input#newPassword").simulate("change", { target: { id: "newPassword", value: "qwerty" }});
    wrapper.find("input#confPassword").simulate("change", { target: { id: "confPassword", value: "asdfgh" }});
    wrapper.find("form").simulate("submit", { preventDefault: () => {}});
    expect(wrapper.find(".form-errors").text()).toEqual("Passwords does not match");
  });
  it("calls editPassword function once on form submit", () => {
    wrapper.find("input#password").simulate("change", { target: { id: "password", value: "123456" }});
    wrapper.find("input#newPassword").simulate("change", { target: { id: "newPassword", value: "qwerty" }});
    wrapper.find("input#confPassword").simulate("change", { target: { id: "confPassword", value: "qwerty" }});
    wrapper.find("form").simulate("submit", { preventDefault: () => {}});
    expect(mockSubmitFunc.mock.calls.length).toEqual(1);
  });
  it("calls resetErrors function once on form submit", () => {
    wrapper.find("input#password").simulate("change", { target: { id: "password", value: "123456" }});
    wrapper.find("input#newPassword").simulate("change", { target: { id: "newPassword", value: "qwerty" }});
    wrapper.find("input#confPassword").simulate("change", { target: { id: "confPassword", value: "qwerty" }});
    wrapper.find("form").simulate("submit", { preventDefault: () => {}});
    expect(mockSubmitFunc.mock.calls.length).toEqual(1);
  });
  it("calls editPassword with correct arguments", () => {
    wrapper.find("input#password").simulate("change", { target: { id: "password", value: "123456" }});
    wrapper.find("input#newPassword").simulate("change", { target: { id: "newPassword", value: "qwerty" }});
    wrapper.find("input#confPassword").simulate("change", { target: { id: "confPassword", value: "qwerty" }});
    wrapper.find("form").simulate("submit", { preventDefault: () => {}});
    expect(mockSubmitFunc).toHaveBeenCalledWith(
      {
        "username": "admin",
        "password": "123456",
        "new_password": "qwerty"
      }
    );
  });
}); 