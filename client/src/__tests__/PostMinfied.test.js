import React from "react";
import { shallow } from "enzyme";
import { PostMinified } from "../components/PostMinified/PostMinified";

// ToDo: create test for image posts
describe("PostMinified component", () => {
  let wrapper;
  let testPost = {
    title: "Post",
    updated: false,
    username: "admin",
    subzeddit_title: "Subzeddit",
    comments_num: 0,
    type: "text",
    content: "content",
  };
  beforeEach(() => {
    wrapper = shallow(<PostMinified post={testPost} />);
  });
  it("renders general wrappers", () => {
    expect(wrapper.exists(".post-mini-wrapper")).toBeTruthy();
    expect(wrapper.exists(".post-mini-content-wrapper")).toBeTruthy();
    expect(wrapper.exists(".post-mini-info")).toBeTruthy();
    expect(wrapper.exists(".post-mini-user-options")).toBeTruthy();
  });
  it("renders right title", () => {
    expect(wrapper.find(".post-mini-title").text()).toEqual("Post");
  });
  it("renders right post info", () => {
    expect(wrapper.find("p.post-general-info").text()).toEqual(
      "Posted by u/admin <CreationTime /> to z/Subzeddit"
    );
  });
  it("renders right number of comments", () => {
    expect(wrapper.find(".comments-element .user-options-name").text()).toEqual(
      "0 comments"
    );
  });
  it("contentActive state is false by default", () => {
    expect(wrapper.state().contentActive).toBeFalsy();
  });
  it("does not render post content by default", () => {
    expect(wrapper.exists(".post-mini-content")).toBeFalsy();
  });
  it("icon has class expand-icon by default", () => {
    expect(
      wrapper
        .find(".content-element .user-options-icon")
        .hasClass("expand-icon")
    );
  });
  it("icon changes class after click on details", () => {
    wrapper.find("div.content-element").simulate("click");
    expect(
      wrapper
        .find(".content-element .user-options-icon")
        .hasClass("collapse-icon")
    );
    wrapper.find("div.content-element").simulate("click");
    expect(
      wrapper
        .find(".content-element .user-options-icon")
        .hasClass("expand-icon")
    );
  });
  it("content of the post shown after click on details", () => {
    wrapper.find("div.content-element").simulate("click");
    expect(wrapper.exists(".post-mini-content")).toBeTruthy();
    wrapper.find("div.content-element").simulate("click");
    expect(wrapper.exists(".post-mini-content")).toBeFalsy();
  });
  it("show right content of the post", () => {
    wrapper.find("div.content-element").simulate("click");
    expect(wrapper.find(".post-mini-content p").text()).toEqual("content");
  });
});
