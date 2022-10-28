import React from "react";
import TestSuiteRow from "./TestSuiteRow";

const TestSuiteTable = ({ testSuites }) => {
  return (
    <table>
      <tbody>
        {testSuites.map((testSuite) => (
          <TestSuiteRow
            key={testSuite.id}
            name={testSuite.test_suite_name}
            testPlans={testSuite.test_plans}
          />
        ))}
      </tbody>
    </table>
  );
};

export default TestSuiteTable;
