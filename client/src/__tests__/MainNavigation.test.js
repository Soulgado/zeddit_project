import React from "react";
import { shallow } from "enzyme";
import { MainNavigation } from "../components/MainNavigation/MainNavigation";

describe("<MainNavigation />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<MainNavigation />);
  });
  it("renders 4 navigation elements", () => {
    expect(wrapper.find(".navigation-element").length).toEqual(4);
  });
  it("does not render wrong elements", () => {
    expect(wrapper.exists(".welcome-message")).toBeFalsy();
  });
  it("renders 4 buttons", () => {
    expect(wrapper.find("button").length).toEqual(4);
  });
  it("renders 4 'li' elements", () => {
    expect(wrapper.find("li").length).toEqual(4);
  });
});

describe("MainNavigation with logged in user", () => {
  let customProps = {
    user: {
      username: "admin",
    },
    loggedIn: true,
  };
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<MainNavigation {...customProps} />);
  });
  it("renders 4 navigation elements", () => {
    expect(wrapper.find(".navigation-element").length).toEqual(4);
  });
  it("renders 4 buttons", () => {
    expect(wrapper.find("button").length).toEqual(4);
  });
  it("renders 5 'li' elements", () => {
    expect(wrapper.find("li").length).toEqual(5);
  });
  it("render welcome message when logged in", () => {
    expect(wrapper.exists(".welcome-message")).toBeTruthy();
  });
  it("render the right name in welcome message", () => {
    expect(wrapper.find(".welcome-message").text()).toEqual("Hello, admin!");
  });
});
