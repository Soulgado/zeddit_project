import React from "react";
import { mount } from "enzyme";
import { VoteButtons } from "../components/VoteButtons/VoteButtons";

describe("VoteButtons component", () => {
  let wrapper;
  const user = {
    id: 1,
    username: "admin"
  };
  const post = {
    id: 1,
    rating: 1,
    upvotes: 12,
    downvotes: 4
  };
  const votePostMock = jest.fn();
  beforeEach(() => {
    wrapper = mount(<VoteButtons votePost={votePostMock} user={user} post={post} loggedIn={true} />);
  });
  afterEach(() => {
    votePostMock.mockClear();
  });
  it("renders correct number of upvotes", () => {
    expect(wrapper.find(".upvote-wrapper > span").text()).toEqual("12");
  });
  it("renders correct rating of post", () => {
    expect(wrapper.find(".post-rating").text()).toEqual("8");
  });
  it("renders correct number of downvotes", () => {
    expect(wrapper.find(".downvote-wrapper > span").text()).toEqual("4");
  });
  it("doesn't change the rating on upvote click if post.rating === 1", () => {
    wrapper.find(".upvote-button").simulate("click");
    expect(wrapper.find(".upvote-wrapper > span").text()).toEqual("12");
  });
  it("doesn't call votePost on upvote click if post.rating === 1", () => {
    wrapper.find(".upvote-button").simulate("click");
    expect(votePostMock.mock.calls.length).toEqual(0);
  });
  it("upvote-button has class 'upvote-active' if post.rating === 1", () => {
    expect(wrapper.find(".upvote-button").hasClass("upvote-active")).toBeTruthy();
  });
  it("change number of upvotes on downvote click if post.rating === 1", () => {
    wrapper.find(".downvote-button").simulate("click");
    expect(wrapper.find(".upvote-wrapper > span").text()).toEqual("11");
  });
  it("change post rating on downvote click if post.rating === 1", () => {
    wrapper.find(".downvote-button").simulate("click");
    expect(wrapper.find(".post-rating").text()).toEqual("6");
  });
  it("change number of downvotes on downvotes click if post.rating === 1", () => {
    wrapper.find(".downvote-button").simulate("click");
    expect(wrapper.find(".downvote-wrapper > span").text()).toEqual("5");
  });
  it("downvote-button doesn't have 'downvote-active' class if post.rating === 1", () => {
    expect(wrapper.find(".downvote-button").hasClass("downvote-active")).toBeFalsy();
  });
  it("calls votePost with correct arguments on downvote click if post.rating === 1", () => {
    wrapper.find(".downvote-button").simulate("click");
    expect(votePostMock).toHaveBeenCalledWith(1, 1, -1);
  });
});