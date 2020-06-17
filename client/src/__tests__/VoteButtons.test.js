import React from "react";
import { shallow } from "enzyme";
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
  beforeEach(() => {
    wrapper = shallow(<VoteButtons user={user} post={post} loggedIn={true} />);
  });
  it("renders correct number of upvotes", () => {
    expect(wrapper.find(".upvote-wrapper > span").text()).toEqual("12");
  });
  it("state values are correct by default", () => {
    expect(wrapper.state().user_rating).toEqual(1);
    expect(wrapper.state().upvotes).toEqual(12);
    expect(wrapper.state().downvotes).toEqual(4);
  });
});