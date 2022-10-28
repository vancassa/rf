import React from "react";

const TestSuiteRow = ({ testSuite }) => {
  return (
    <tr>
      <td>{">"}</td>
      <td>{testSuite.test_suite_name}</td>
      <td>{testSuite.test_plans.length + 1} tests</td>
      <td>Edit</td>
    </tr>
  );
};

export default TestSuiteRow;
