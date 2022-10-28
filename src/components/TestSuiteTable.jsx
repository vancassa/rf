import React from "react";
import TestSuiteRow from "./TestSuiteRow";

const TestSuiteTable = ({ testSuites }) => {
  return (
    <table>
      <tbody>
        {testSuites.map((testSuite) => (
          <TestSuiteRow key={testSuite.id} testSuite={testSuite} />
        ))}
      </tbody>
    </table>
  );
};

export default TestSuiteTable;
