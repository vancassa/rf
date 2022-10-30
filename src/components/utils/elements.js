import { screen } from "@testing-library/react";

export const elements = {
  get testSuiteNameInput() {
    return screen.getByLabelText("Test suite name");
  },

  get testNamesInputs() {
    return screen.getAllByLabelText("Test plan");
  },

  get browserSelects() {
    return screen.getAllByLabelText("Browser");
  },

  get instructionCountInputs() {
    return screen.getAllByLabelText("Instruction count");
  },

  get removeButtons() {
    return screen.getAllByRole("button", { name: "X" });
  },

  get addTestPlanButton() {
    return screen.getByRole("button", { name: "Add test plan" });
  },

  get submitButton() {
    return screen.getByRole("button", { name: "Submit" });
  },

  get closeButton() {
    return screen.getByRole("button", { name: "Close" });
  },

  get tableRows() {
    return screen.getAllByRole("row");
  },

  get editDialog() {
    return screen.getByRole("dialog", { name: "Edit dialog" });
  },
  get queryEditDialog() {
    return screen.queryByRole("dialog", { name: "Edit dialog" });
  },
};
