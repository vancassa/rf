import { fireEvent, render, screen } from "@testing-library/react";
import EditDialog from "../EditDialog";
import testSuitesData from "./mockTestSuite.json";

describe("Edit dialog", () => {
  const renderScreen = (onClose) => {
    const testSuite = testSuitesData[0];
    return render(
      <EditDialog
        name={testSuite.test_suite_name}
        testPlans={testSuite.test_plans}
        onClose={onClose ?? jest.fn()}
      />
    );
  };

  it("should show editable name and test plans", () => {
    renderScreen();

    expect(screen.getByLabelText("Test suite name")).toBeInTheDocument();
    expect(screen.getAllByRole("textbox").length).toBe(7);
    expect(screen.getAllByRole("combobox").length).toBe(6);
    expect(screen.getAllByRole("spinbutton").length).toBe(6);
    expect(screen.getAllByRole("button", { name: "X" }).length).toBe(6);
    expect(
      screen.getByRole("button", { name: "Add test plan" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("should be able to edit test suite name", () => {
    renderScreen();

    const testSuiteInput = screen.getByLabelText("Test suite name");

    expect(testSuiteInput.value).toBe("Suite Mix Save Mental");
    fireEvent.change(testSuiteInput, { target: { value: "New name" } });
    expect(testSuiteInput.value).toBe("New name");
  });

  it("should be able to edit test name", () => {
    renderScreen();

    const testPlanInput = screen.getAllByRole("textbox")[1];

    expect(testPlanInput.value).toBe("Test Plan Stiff Any Main");
    fireEvent.change(testPlanInput, {
      target: { value: "New test plan name" },
    });
    expect(testPlanInput.value).toBe("New test plan name");
  });

  it("should be able to edit browser type", () => {
    renderScreen();

    const browserSelect = screen.getAllByRole("combobox")[0];

    expect(browserSelect.value).toBe("firefox");
    fireEvent.change(browserSelect, { target: { value: "chrome" } });
    expect(browserSelect.value).toBe("chrome");
  });

  it("should be able to add new test plan", () => {
    renderScreen();

    fireEvent.click(screen.getByRole("button", { name: "Add test plan" }));

    expect(screen.getAllByRole("textbox").length).toBe(8);
    expect(screen.getAllByRole("combobox").length).toBe(7);
    expect(screen.getAllByRole("spinbutton").length).toBe(7);
    expect(screen.getAllByRole("button", { name: "X" }).length).toBe(7);
  });

  it("should be able to remove test plan", () => {
    renderScreen();

    expect(screen.queryAllByRole("textbox")[1].value).toBe(
      "Test Plan Stiff Any Main"
    );
    expect(screen.queryAllByRole("textbox")[2].value).toBe(
      "Test Plan Pride Queen Travel"
    );

    fireEvent.click(screen.getAllByRole("button", { name: "X" })[0]);

    expect(screen.queryAllByRole("textbox")[1].value).toBe(
      "Test Plan Pride Queen Travel"
    );
    expect(screen.getAllByRole("textbox").length).toBe(6);
    expect(screen.getAllByRole("combobox").length).toBe(5);
    expect(screen.getAllByRole("spinbutton").length).toBe(5);
    expect(screen.getAllByRole("button", { name: "X" }).length).toBe(5);
  });

  it("should call onClose when close button is clicked", () => {
    const onClose = jest.fn();
    renderScreen(onClose);

    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(onClose).toBeCalled();
  });

  describe("Validation on submit", () => {
    it("should not allow empty test suite name", () => {
      const onClose = jest.fn();
      renderScreen(onClose);

      fireEvent.change(screen.getByLabelText("Test suite name"), {
        target: { value: "" },
      });
      fireEvent.click(screen.getByRole("button", { name: "Submit" }));

      expect(screen.getByText("Test suite name should not be empty"));
      expect(onClose).not.toBeCalled();
    });

    it("should not allow empty test name", () => {
      const onClose = jest.fn();
      renderScreen(onClose);

      fireEvent.change(screen.getAllByRole("textbox")[1], {
        target: { value: "" },
      });
      fireEvent.click(screen.getByRole("button", { name: "Submit" }));

      expect(screen.getByText("Test name should not be empty"));
      expect(onClose).not.toBeCalled();
    });

    it("should not allow invalid browser", () => {
      const onClose = jest.fn();
      renderScreen(onClose);

      const browserSelect = screen.getAllByRole("combobox")[0];

      expect(browserSelect.value).toBe("firefox");
      fireEvent.change(browserSelect, { target: { value: "opera" } });
      fireEvent.click(screen.getByRole("button", { name: "Submit" }));
      expect(
        screen.getByText(
          'Browser must be one of "chrome", "firefox", "safari", or "edge"'
        )
      );
      expect(onClose).not.toBeCalled();
    });

    it("should not allow instruction count <= 0", () => {
      const onClose = jest.fn();
      renderScreen(onClose);

      fireEvent.change(screen.getAllByRole("spinbutton")[0], {
        target: { value: "" },
      });
      fireEvent.click(screen.getByRole("button", { name: "Submit" }));

      expect(screen.getByText("Instruction count must be more than 0"));
      expect(onClose).not.toBeCalled();
    });

    it("should have at least one test plan", () => {
      const onClose = jest.fn();
      renderScreen(onClose);

      const removeButtons = screen.getAllByRole("button", { name: "X" });
      for (let i = 0; i < removeButtons.length; i++) {
        fireEvent.click(removeButtons[0]);
      }

      expect(screen.getByText("A test suite must contain at least one plan"));
      expect(onClose).not.toBeCalled();
    });

    it("should call onClose if validation is successful", () => {
      const onClose = jest.fn();
      renderScreen(onClose);

      fireEvent.click(screen.getByRole("button", { name: "Submit" }));
      expect(onClose).toBeCalled();
    });
  });
});
