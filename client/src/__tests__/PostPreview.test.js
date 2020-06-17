import React from "react";
import { shallow } from "enzyme";
import PostPreview from "../components/PostPreview/PostPreview";

describe("PostPreview component", () => {
  let wrapper;
  it("renders image preview if type props is 'image'", () => {
    wrapper = shallow(<PostPreview type={"image"} />);
    expect(wrapper.exists(".image-preview")).toBeTruthy();
  });
  it("renders text preview by default", () => {
    wrapper = shallow(<PostPreview />);
    expect(wrapper.exists(".text-preview")).toBeTruthy();
  });
});