import React from "react";
import { shallow } from "enzyme";
import { SubzedditList } from "../components/SubzedditList/SubzedditList";

describe("SubzedditList component", () => {
  let wrapper;
  const user = {
    id: 1,
    username: "admin"
  };
  const subzedditsList = [];
  const getSubzedditsMock = jest.fn();
  beforeEach(() => {
    wrapper = shallow(<SubzedditList
      user={user}
      subzedditsList={subzedditsList}
      getSubzeddits={getSubzedditsMock}
    />);
  });
  afterEach(() => {
    getSubzedditsMock.mockClear();
  });
  it("calls getSubzeddits function on mount", () => {
    expect(getSubzedditsMock.mock.calls.length).toEqual(1);
  });
  it("calls getSubzeddits function with correct arguments", () => {
    expect(getSubzedditsMock).toHaveBeenCalledWith({
      id: 1,
      username: "admin"
    });
  });
  it("renders ul element if 'loading' props is false", () => {
    expect(wrapper.exists("ul#subzeddits-list")).toBeTruthy();
  });
});