import { fireEvent, render, screen } from "@testing-library/react";
import TestSuiteTable from "../TestSuiteTable";
import testSuitesData from "./mockTestSuite.json";

describe("Test suite table", () => {
  it("should render the table", () => {
    render(<TestSuiteTable testSuites={testSuitesData} />);

    expect(screen.getAllByRole("row").length).toBe(2);
  });

  it("should show edit dialog when clicking on edit button", () => {
    render(<TestSuiteTable testSuites={testSuitesData} />);

    fireEvent.click(screen.getAllByRole("button", { name: "Edit" })[0]);

    expect(
      screen.getByRole("dialog", { name: "Edit dialog" })
    ).toBeInTheDocument();
  });

  it("should be able to close edit dialog", () => {
    render(<TestSuiteTable testSuites={testSuitesData} />);

    fireEvent.click(screen.getAllByRole("button", { name: "Edit" })[0]);
    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    expect(
      screen.queryByRole("dialog", { name: "Edit dialog" })
    ).not.toBeInTheDocument();
  });
});
