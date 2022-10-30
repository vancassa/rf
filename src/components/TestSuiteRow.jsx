import React, { useState } from "react";

const TestSuiteRow = ({ testSuite, onEditButtonClick }) => {
  const { test_suite_name: testSuiteName, test_plans: testPlans } = testSuite;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <tr className="suite-row">
        <td>
          <button
            type="button"
            className="unstyled"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {isExpanded ? "ᐁ" : "ᐅ"}
          </button>
        </td>
        <td>{testSuiteName}</td>
        <td>{testPlans.length} tests</td>
        <td>
          <button
            type="button"
            className="unstyled"
            onClick={onEditButtonClick}
          >
            Edit
          </button>
        </td>
      </tr>
      {isExpanded &&
        testPlans.length > 0 &&
        testPlans.map((testPlan, i) => (
          <tr key={i}>
            <td style={{ paddingLeft: "3rem" }} colSpan={2}>
              {testPlan.test_name}
            </td>
            <td>{testPlan.browser}</td>
            <td>{testPlan.instruction_count} steps</td>
          </tr>
        ))}
    </>
  );
};

export default TestSuiteRow;
