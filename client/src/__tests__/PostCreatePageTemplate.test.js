import React from "react";
import { shallow } from "enzyme";
import { PostCreatePageTemplate } from "../components/PostCreatePage/PostCreatePageTemplate";

describe("PostCreatePageTemplate component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<PostCreatePageTemplate />);
  });
  it("renders two button elements", () => {
    expect(wrapper.find("button").length).toEqual(2);
  });
  it("default value for formState state is 'text'", () => {
    expect(wrapper.state().formState).toEqual("text");
  });
  it("text post choose button has 'button-active' class by default", () => {
    expect(wrapper.find("button").at(0).hasClass("button-active")).toBeTruthy();
  });
  it("image post choose button doesn't have 'button-active' class by default", () => {
    expect(wrapper.find("button").at(1).hasClass("button-active")).toBeFalsy();
  });
  it("changeToText function doesn't change formState, if it has 'text' value", () => {
    wrapper.find("button").at(0).simulate("click");
    expect(wrapper.state().formState).toEqual("text");
  });
  it("formState state changes on click", () => {
    wrapper.find("button").at(1).simulate("click");
    expect(wrapper.state().formState).toEqual("image");
  });
  it("text post choose button doesn't have 'button-active' class after click on image button", () => {
    wrapper.find("button").at(1).simulate("click");
    expect(wrapper.find("button").at(0).hasClass("button-active")).toBeFalsy();
  });
  it("image post choose button have 'button-active' class after click on it", () => {
    wrapper.find("button").at(1).simulate("click");
    expect(wrapper.find("button").at(1).hasClass("button-active")).toBeTruthy();
  });
  it("changeToText function changes formState to 'text'", () => {
    wrapper.find("button").at(1).simulate("click");
    expect(wrapper.state().formState).toEqual("image");
    wrapper.find("button").at(0).simulate("click");
    expect(wrapper.state().formState).toEqual("text");
  });
});