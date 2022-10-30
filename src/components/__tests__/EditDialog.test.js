import { fireEvent, render, screen } from "@testing-library/react";
import EditDialog from "../EditDialog";
import { elements } from "../utils/elements";
import testSuitesData from "./mockTestSuite.json";

describe("Edit dialog", () => {
  const renderScreen = (onClose) => {
    const testSuite = testSuitesData[0];
    return render(
      <EditDialog testSuite={testSuite} onClose={onClose ?? jest.fn()} />
    );
  };

  it("should show editable name and test plans", () => {
    renderScreen();

    expect(elements.testSuiteNameInput).toBeInTheDocument();
    expect(elements.testNamesInputs.length).toBe(6);
    expect(elements.browserSelects.length).toBe(6);
    expect(elements.instructionCountInputs.length).toBe(6);
    expect(elements.removeButtons.length).toBe(6);
    expect(elements.addTestPlanButton).toBeInTheDocument();
    expect(elements.submitButton).toBeInTheDocument();
    expect(elements.closeButton).toBeInTheDocument();
  });

  it("should be able to edit test suite name", () => {
    renderScreen();

    const testSuiteInput = elements.testSuiteNameInput;

    expect(testSuiteInput.value).toBe("Suite Mix Save Mental");
    fireEvent.change(testSuiteInput, { target: { value: "New name" } });
    expect(testSuiteInput.value).toBe("New name");
  });

  it("should be able to edit test name", () => {
    renderScreen();

    const testNameInput = elements.testNamesInputs[0];

    expect(testNameInput.value).toBe("Test Plan Stiff Any Main");
    fireEvent.change(testNameInput, {
      target: { value: "New test plan name" },
    });
    expect(testNameInput.value).toBe("New test plan name");
  });

  it("should be able to edit browser type", () => {
    renderScreen();

    const browserSelect = elements.browserSelects[0];

    expect(browserSelect.value).toBe("firefox");
    fireEvent.change(browserSelect, { target: { value: "chrome" } });
    expect(browserSelect.value).toBe("chrome");
  });

  it("should be able to add new test plan", () => {
    renderScreen();

    fireEvent.click(elements.addTestPlanButton);

    expect(elements.testNamesInputs.length).toBe(7);
    expect(elements.browserSelects.length).toBe(7);
    expect(elements.instructionCountInputs.length).toBe(7);
    expect(elements.removeButtons.length).toBe(7);
  });

  it("should be able to remove test plan", () => {
    renderScreen();

    expect(screen.queryAllByLabelText("Test plan")[0].value).toBe(
      "Test Plan Stiff Any Main"
    );
    expect(screen.queryAllByLabelText("Test plan")[1].value).toBe(
      "Test Plan Pride Queen Travel"
    );

    fireEvent.click(elements.removeButtons[0]);

    expect(screen.queryAllByLabelText("Test plan")[0].value).toBe(
      "Test Plan Pride Queen Travel"
    );
    expect(elements.testNamesInputs.length).toBe(5);
    expect(elements.browserSelects.length).toBe(5);
    expect(elements.instructionCountInputs.length).toBe(5);
    expect(elements.removeButtons.length).toBe(5);
  });

  it("should call onClose when close button is clicked", () => {
    const onClose = jest.fn();
    renderScreen(onClose);

    fireEvent.click(elements.closeButton);
    expect(onClose).toBeCalled();
  });

  describe("Validation on submit", () => {
    it("should not allow empty test suite name", () => {
      const onClose = jest.fn();
      renderScreen(onClose);

      fireEvent.change(elements.testSuiteNameInput, {
        target: { value: "" },
      });
      fireEvent.click(elements.submitButton);

      expect(screen.getByText("Test suite name should not be empty"));
      expect(onClose).not.toBeCalled();
    });

    it("should not allow empty test name", () => {
      const onClose = jest.fn();
      renderScreen(onClose);

      fireEvent.change(elements.testNamesInputs[1], {
        target: { value: "" },
      });
      fireEvent.click(elements.submitButton);

      expect(screen.getByText("Test name should not be empty"));
      expect(onClose).not.toBeCalled();
    });

    it("should not allow invalid browser", () => {
      const onClose = jest.fn();
      renderScreen(onClose);

      const browserSelect = elements.browserSelects[0];

      expect(browserSelect.value).toBe("firefox");
      fireEvent.change(browserSelect, { target: { value: "opera" } });
      fireEvent.click(elements.submitButton);
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

      fireEvent.change(elements.instructionCountInputs[0], {
        target: { value: "" },
      });
      fireEvent.click(elements.submitButton);

      expect(screen.getByText("Instruction count must be more than 0"));
      expect(onClose).not.toBeCalled();
    });

    it("should have at least one test plan", () => {
      const onClose = jest.fn();
      renderScreen(onClose);

      const removeButtons = elements.removeButtons;
      for (let i = 0; i < removeButtons.length; i++) {
        fireEvent.click(removeButtons[0]);
      }

      expect(screen.getByText("A test suite must contain at least one plan"));
      expect(onClose).not.toBeCalled();
    });

    it("should call onClose if validation is successful", () => {
      const onClose = jest.fn();
      renderScreen(onClose);

      fireEvent.click(elements.submitButton);
      expect(onClose).toBeCalled();
    });
  });
});
