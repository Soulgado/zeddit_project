import React from "react";
import { shallow } from "enzyme";
import { PostCreatePage } from "../components/PostCreatePage/PostCreatePage";
import Placeholder from "../components/fetchingPlaceholder";

describe("PostCreatePage component", () => {
  let wrapper;
  const post = {
    id: 1,
    title: "Post title",
    subzeddit: "Subzeddit"
  };
  const location = {
    state: {
      subzeddit: "subzeddit"
    }
  };
  const getSubzedditsMock = jest.fn();
  const resetCreationFlagMock = jest.fn();
  beforeEach(() => {
    wrapper = shallow(<PostCreatePage
      post={post}
      location={location}
      getSubzeddits={getSubzedditsMock}
      resetCreationFlag={resetCreationFlagMock}
      />);
  });
  afterEach(() => {
    getSubzedditsMock.mockClear();
    resetCreationFlagMock.mockClear();
  });
  it("renders wrapper", () => {
    expect(wrapper.exists(".create-wrapper")).toBeTruthy();
  });
  it("renders loading placeholder if loading props is true", () => {
    wrapper.setProps({ loading: true });
    expect(wrapper.find(Placeholder).dive().exists(".placeholder")).toBeTruthy();
  });
  it("calls getSubzeddit function once on mount", () => {
    expect(getSubzedditsMock.mock.calls.length).toEqual(1);
  });
  it("sets currentSubzeddit state to the props.location.state.subzeddit value", () => {
    expect(wrapper.update().state().currentSubzeddit).toEqual("subzeddit");
  });
  it("resetCreationFlag function is called once on unmount", () => {
    wrapper.unmount();
    expect(resetCreationFlagMock.mock.calls.length).toEqual(1);
  });
  it("renders success message if creationFlag prop is true", () => {
    wrapper.setProps({ creationFlag: true });
    expect(wrapper.exists(".success-message")).toBeTruthy();
  });
});