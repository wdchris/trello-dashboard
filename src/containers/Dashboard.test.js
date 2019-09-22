import React from "react";
import { mount } from "enzyme";
import Dashboard from "./Dashboard";
import trelloData from "../utils/trelloData";

let wrapper;
const select = selector => wrapper.find(selector).first();
const selectFirstOption = () => {
  select(`[data-test="select-trello-list"]`).simulate("keyDown", {
    key: "ArrowDown",
    keyCode: 40
  });
  select(`[data-test="select-trello-list"]`).simulate("keyDown", {
    key: "Enter",
    keyCode: 13
  });
  wrapper.update();
};

jest.mock("../utils/trelloData");

describe("Dashboard", () => {
  it("gets trello data from the api", async () => {
    const getDataMock = jest.spyOn(trelloData, "getDashboardData");

    wrapper = await mount(<Dashboard />);
    wrapper.update();

    expect(getDataMock).toBeCalledTimes(1);
  });

  it("renders a select list populated correctly", async () => {
    wrapper = await mount(<Dashboard />);
    wrapper.update();

    expect(
      select(`[data-test="select-trello-list"]`).prop("options").length
    ).toBe(3);

    expect(
      select(`[data-test="select-trello-list"]`).prop("options")[0].value
    ).toEqual("list test");

    expect(
      select(`[data-test="select-trello-list"]`).prop("options")[1].value
    ).toEqual("list test 2");

    expect(
      select(`[data-test="select-trello-list"]`).prop("options")[2].value
    ).toEqual("list test 3");
  });

  it("renders correctly filtered boards and cards", async () => {
    wrapper = await mount(<Dashboard />);
    wrapper.update();

    selectFirstOption();

    expect(select(`[data-test="result-board-1"]`).exists()).toBe(true);
    expect(select(`[data-test="result-board-2"]`).exists()).toBe(false);
    expect(select(`[data-test="result-board-3"]`).exists()).toBe(true);

    expect(select(`[data-test="result-board-1-cards"]`).exists()).toBe(true);
    expect(select(`[data-test="result-board-1-cards"]`).text()).toBe(
      "card test"
    );

    expect(select(`[data-test="result-board-3-cards"]`).exists()).toBe(true);
    expect(select(`[data-test="result-board-3-cards"]`).text()).toBe(
      "card test 4,  card test 5"
    );
  });
});
