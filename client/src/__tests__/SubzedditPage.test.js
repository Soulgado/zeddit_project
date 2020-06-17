import React from "react";
import { shallow } from "enzyme";
import { SubzedditPage } from "../components/SubzedditPage/SubzedditPage";

describe("SubzedditPage component", () => {
  let wrapper;
  const match = {
    params: "Title"
  };
  const user = {
    id: 1,
    username: "admin"
  };
  const getSubzedditMock = jest.fn();
  beforeEach(() => {
    wrapper = shallow(<SubzedditPage
      user={user}
      match={match}
      getSubzeddit={getSubzedditMock}
    />);
  });
  afterEach(() => {
    getSubzedditMock.mockClear();
  }); 
  it("calls getSubzeddit function on mount", () => {
    expect(getSubzedditMock.mock.calls.length).toEqual(1);
  });
  it("calls getSubzeddit function with correct arguments", () => {
    expect(getSubzedditMock).toHaveBeenCalledWith("Title", { id: 1, username: "admin" });
  });
});