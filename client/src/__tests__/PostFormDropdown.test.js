import React from "react";
import { shallow } from "enzyme";
import Dropdown from "../components/PostFormDropdown/PostFormDropdown";

describe("Dropdown component", () => {
  let wrapper;
  const subzeddits = [
    {
      title: "Subzeddit"
    },
    {
      title: "Another Subzeddit"
    },
    {
      title: "Pictures"
    }
  ];
  beforeEach(() => {
    wrapper = shallow(<Dropdown titlesList={[]}/>);
  });
  it("renders ul element", () => {
    expect(wrapper.find("ul").length).toEqual(1);
  });
  it("doesn't render li elements titlesList props is empty", () => {
    expect(wrapper.exists("li")).toBeFalsy();
  });
  it("renders 3 li elements for each entry in passed titlesList props", () => {
    wrapper.setProps({
      titlesList: subzeddits
    });
    expect(wrapper.find("li").length).toEqual(3);
  });
});