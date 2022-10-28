const isEmpty = (value) =>
  value === null || value === undefined || value === "";

export const validate = (testSuiteName, testPlans) => {
  /**
   * Validations:
   *  - `test_suite_name` and `test_name` should not be empty
   *  - a test suite must contain at least one test plan
   *  - `browser` must be one of `"chrome"`, `"firefox"`, `"safari"`, or `"edge"`
   *  - `instruction_count` must be > 0
   */

  if (isEmpty(testSuiteName)) {
    return {
      isValid: false,
      errorMessage: "Test suite name should not be empty",
    };
  }

  if (testPlans.length === 0) {
    return {
      isValid: false,
      errorMessage: "A test suite must contain at least one test plan",
    };
  }

  for (let i = 0; i < testPlans.length; i++) {
    const { test_name, browser, instruction_count } = testPlans[i];

    if (isEmpty(test_name)) {
      return {
        isValid: false,
        errorMessage: "Test name should not be empty",
      };
    }

    if (
      !(
        browser === "chrome" ||
        browser === "firefox" ||
        browser === "safari" ||
        browser === "edge"
      )
    ) {
      return {
        isValid: false,
        errorMessage:
          'Browswer must be one of "chrome", "firefox", "safari", or "edge"',
      };
    }

    if (instruction_count <= 0 || instruction_count === "") {
      console.log("instruction_count :>> ", instruction_count);
      return {
        isValid: false,
        errorMessage: "Instruction count must be > 0",
      };
    }
  }

  return { isValid: true };
};
