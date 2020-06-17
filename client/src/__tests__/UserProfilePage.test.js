import React from "react";
import { shallow } from "enzyme";
import { UserProfilePage } from "../components/UserProfilePage/UserProfilePage";

describe("UserProfilePage component", () => {
  let wrapper;
  const user = {
    id: 1,
    username: "admin",
    email: "example@google.com"
  };
  beforeEach(() => {
    wrapper = shallow(<UserProfilePage user={user} />);
  });
  it("renders 3 containers with 'user-settings-element' class", () => {
    expect(wrapper.find(".user-settings-element").length).toEqual(3);
  });
  it("renders 4 button elements", () => {
    expect(wrapper.find("button").length).toEqual(4);
  });
  it("renders correct username information", () => {
    expect(wrapper.find(".user-settings-element > p").at(0).text()).toEqual("Current username: admin");
  });
  it("renders correct email information", () => {
    expect(wrapper.find(".user-settings-element > p").at(1).text()).toEqual("Currrent email address: example@google.com");
  });
  it("default state values are correct", () => {
    expect(wrapper.state().usernameFormActive).toEqual(false);
    expect(wrapper.state().passwordFormActive).toEqual(false);
    expect(wrapper.state().emailFormActive).toEqual(false);
  });
  it("changes usernameFormActive state on click", () => {
    wrapper.find("button").at(0).simulate("click");
    expect(wrapper.state().usernameFormActive).toEqual(true);
    wrapper.find("button").at(0).simulate("click");
    expect(wrapper.state().usernameFormActive).toEqual(false);
  });
  it("changes emailFormActive state on click", () => {
    wrapper.find("button").at(1).simulate("click");
    expect(wrapper.state().emailFormActive).toEqual(true);
    wrapper.find("button").at(1).simulate("click");
    expect(wrapper.state().emailFormActive).toEqual(false);
  });
  it("changes passwordFormActive state on click", () => {
    wrapper.find("button").at(2).simulate("click");
    expect(wrapper.state().passwordFormActive).toEqual(true);
    wrapper.find("button").at(2).simulate("click");
    expect(wrapper.state().passwordFormActive).toEqual(false);
  });
  it("closes all other active forms on username form click", () => {
    wrapper.find("button").at(2).simulate("click");
    wrapper.find("button").at(0).simulate("click");
    expect(wrapper.state().passwordFormActive).toEqual(false);
    expect(wrapper.state().usernameFormActive).toEqual(true);
  });
  it("closes all other active forms on email form click", () => {
    wrapper.find("button").at(2).simulate("click");
    wrapper.find("button").at(1).simulate("click");
  });
});