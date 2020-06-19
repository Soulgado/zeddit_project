import React from "react";
import { shallow } from "enzyme";
import { SubscribeButton } from "../components/SubscribeButton/SubscribeButton";

describe("SubscribeButton component", () => {
  let wrapper;
  const changeSubStatusMock = jest.fn();
  const user = {
    id: 1,
    username: "admin"
  };
  const subzeddit = {
    title: "Subzeddit",
    subscription_status: true
  };
  beforeEach(() => {
    wrapper = shallow(<SubscribeButton
      user={user}
      subzeddit={subzeddit}
      changeSubscriptionStatus={changeSubStatusMock}
    />);
  });
  afterEach(() => {
    changeSubStatusMock.mockClear();
  });
  it("renders div elements with class 'subscribe-button-wrapper", () => {
    expect(wrapper.exists("div.subscribe-button-wrapper")).toBeTruthy();
  });
  it("sets correct subscription status state on mount", () => {
    expect(wrapper.state().isSubscribed).toEqual(true);
  });
  it("rendered text is correct", () => {
    expect(wrapper.find("button").text()).toEqual("LEAVE");
  });
  it("calls changeSubStatus with correct arguments on click", () => {
    wrapper.find("button").simulate("click");
    expect(changeSubStatusMock).toHaveBeenCalledWith(
      {
        id: 1,
        username: "admin"
      },
      "Subzeddit",
      true
    );
  });
  it("changes subscription status state to correct value after click", () => {
    wrapper.find("button").simulate("click");
    expect(wrapper.state().isSubscribed).toEqual(false);
  });
});