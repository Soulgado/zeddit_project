import React from "react";
import { shallow } from "enzyme";
import { CommentVoteButtons } from "../components/CommentVoteButtons/CommentVoteButtons";

describe("CommentVoteButtons", () => {
  let wrapper;
  const upvotedComment = {
    upvotes: 120,
    downvotes: 10,
    rating: 1,
  };
  const downvotedComment = {
    upvotes: 10,
    downvotes: 120,
    rating: -1,
  };
  const neutralComment = {
    upvotes: 60,
    downvotes: 60,
    rating: 0,
  };
  it("component renders correct number of upvotes", () => {
    wrapper = shallow(<CommentVoteButtons comment={upvotedComment} />);
    expect(wrapper.find(".upvote-wrapper span").text()).toEqual("120");
  });
  it("component renders correct number of downvotes", () => {
    wrapper = shallow(<CommentVoteButtons comment={downvotedComment} />);
    expect(wrapper.find(".downvote-wrapper span").text()).toEqual("120");
  });
  it("component renders correct rating of a post", () => {
    wrapper = shallow(<CommentVoteButtons comment={upvotedComment} />);
    expect(wrapper.find(".post-rating").text()).toEqual("110");
  });
  it("upvote button has active class if rating is 1", () => {
    wrapper = shallow(<CommentVoteButtons comment={upvotedComment} />);
    expect(
      wrapper.find(".upvote-button").hasClass("upvote-active")
    ).toBeTruthy();
  });
  it("downvote button has active class if rating is -1", () => {
    wrapper = shallow(<CommentVoteButtons comment={downvotedComment} />);
    expect(
      wrapper.find(".downvote-button").hasClass("downvote-active")
    ).toBeTruthy();
  });
  it("no button has active class if rating is 0", () => {
    wrapper = shallow(<CommentVoteButtons comment={neutralComment} />);
    expect(
      wrapper.find(".upvote-button").hasClass("upvote-active")
    ).toBeFalsy();
    expect(
      wrapper.find(".downvote-button").hasClass("downvote-active")
    ).toBeFalsy();
  });
});
