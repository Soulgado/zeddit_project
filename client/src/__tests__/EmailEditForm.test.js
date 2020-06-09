import React from "react";
import { shallow } from "enzyme";
import { EmailEditForm } from "../components/EmailEditForm/EmailEditForm";
import Placeholder from "../components/fetchingPlaceholder";

describe("EmailEditForm component", () => {
  let wrapper;
  it("render loading placeholder if loading props is true", () => {
    wrapper = shallow(<EmailEditForm loading={true}/>, {
      disableLifecycleMethods: true
    });
    expect(wrapper.find(Placeholder).render().find(".loading-text").length).toEqual(1);
  });
  it("render success message if successFlag is true", () => {
    wrapper = shallow(<EmailEditForm successFlag={true}/>, {
      disableLifecycleMethods: true
    });
    expect(wrapper.exists(".success-message")).toBeTruthy();
  });
});