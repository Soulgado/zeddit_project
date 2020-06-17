import React from "react";
import { shallow } from "enzyme";
import { SubzedditMinified }  from "../components/SubzedditMinified/SubzedditMinified";

describe("SubzedditMinified component", () => {
  let wrapper;
  const subzeddit = {
    title: "Coppers",
    creation_date: new Date(2020, 3, 25),
    subscriptions: 20,
    username: "admin"
  };
  beforeEach(() => {
    wrapper = shallow(<SubzedditMinified subzeddit={subzeddit} loggedIn={true}/>);
  });
  it("renders correct subzeddit's metadata", () => {
    expect(wrapper.find("p").at(0).text()).toEqual("Created 25 April 2020 by u/admin");
  });
  it("renders correct number of subscribers", () => {
    expect(wrapper.find("p.subscribers-num").text()).toEqual("20 subscribers");
  });
});