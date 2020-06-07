import React from "react";
import { shallow } from "enzyme";
import { MainPage } from "../components/MainPage/MainPage";

describe("MainPage by default without posts", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<MainPage mostPopularGlobal={[]} />, {
      disableLifecycleMethods: true,
    });
  });
  it("renders correct div elements", () => {
    expect(wrapper.find(".main-page-wrapper").length).toEqual(1);
    expect(wrapper.find(".main-content").length).toEqual(1);
    expect(wrapper.find(".posts-list-wrapper").length).toEqual(1);
  });
  it("renders posts list wrapper", () => {
    expect(wrapper.find(".posts-list").length).toEqual(1);
  });
  it("does not render any posts", () => {
    expect(wrapper.exists(".post-mini-wrapper")).toBeFalsy();
  });
  it("renders sidebar with proper class name", () => {
    expect(wrapper.find("aside").length).toEqual(1);
    expect(wrapper.find("aside").hasClass("sidebar-wrapper")).toBeTruthy();
    expect(wrapper.find("aside").hasClass("main-page-sidebar")).toBeTruthy();
  });
  it("sidebar has two buttons", () => {
    expect(wrapper.find("aside button").length).toEqual(2);
  });
});
