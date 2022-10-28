import React, { useState } from "react";

const TestSuiteRow = ({ name, testPlans }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditDialogOpened, setIsEditDialogOpened] = useState(false);

  const showEditDialog = () => {
    setIsEditDialogOpened(true);
  };

  return (
    <>
      <tr className="suite-row">
        <td>
          <button onClick={() => setIsExpanded((prev) => !prev)}>
            {isExpanded ? "ᐁ" : "ᐅ"}
          </button>
        </td>
        <td>{name}</td>
        <td>{testPlans.length + 1} tests</td>
        <td>
          <button onClick={showEditDialog}>Edit</button>
        </td>
      </tr>
      {isExpanded &&
        testPlans.length > 0 &&
        testPlans.map((testPlan) => (
          <tr>
            <td style={{ paddingLeft: "24px" }} colSpan={2}>
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
