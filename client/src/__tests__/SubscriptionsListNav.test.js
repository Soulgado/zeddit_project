import React from "react";
import { shallow } from "enzyme";
import { SubscriptionsListNav } from "../components/SubscriptionsListNav/SubscriptionsListNav";

describe("SubscriptionsListNav without subscriptions", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SubscriptionsListNav subscriptions={[]} />, {
      disableLifecycleMethods: true,
    });
  });
  it("rendering no list elements", () => {
    expect(wrapper.exists(".navigation-element li")).toBeFalsy();
  });
  it("change dropdownActive state on hover", () => {
    wrapper.find(".navigation-element").simulate("mouseenter");
    expect(wrapper.state().dropdownActive).toEqual(true);
    wrapper.find(".navigation-element").simulate("mouseleave");
    expect(wrapper.state().dropdownActive).toEqual(false);
  });
});

describe("SubscriptionsListNav with subscriptions", () => {
  let wrapper;
  const subscriptionsList = [
    {
      title: "First",
    },
    {
      title: "Second",
    },
    {
      title: "Third",
    },
  ];
  beforeEach(() => {
    wrapper = shallow(
      <SubscriptionsListNav subscriptions={subscriptionsList} />,
      {
        disableLifecycleMethods: true,
      }
    );
  });
  it("rendering no list elements", () => {
    expect(wrapper.exists(".navigation-element li")).toBeFalsy();
  });
  it("change dropdownActive state on hover", () => {
    wrapper.find(".navigation-element").simulate("mouseenter");
    expect(wrapper.state().dropdownActive).toEqual(true);
    wrapper.find(".navigation-element").simulate("mouseleave");
    expect(wrapper.state().dropdownActive).toEqual(false);
  });
  it("render dropdown list on hover", () => {
    wrapper.find(".navigation-element").simulate("mouseenter");
    expect(wrapper.find(".navigation-element li").length).toEqual(3);
    expect(
      wrapper.find(".subscriptions-dropdown li:first-child").text()
    ).toEqual("First");
    expect(
      wrapper.find(".subscriptions-dropdown li:last-child").text()
    ).toEqual("Third");
  });
});
