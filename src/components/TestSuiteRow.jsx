import React, { useState } from "react";
import EditDialog from "./EditDialog";

const TestSuiteRow = ({ name, testPlans }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditDialogOpened, setIsEditDialogOpened] = useState(false);

  const showEditDialog = () => {
    setIsEditDialogOpened(true);
  };

  const closeEditDialog = () => {
    setIsEditDialogOpened(false);
  };

  return (
    <>
      {isEditDialogOpened && (
        <EditDialog
          name={name}
          testPlans={testPlans}
          onClose={closeEditDialog}
        />
      )}
      <tr className="suite-row">
        <td>
          <button type="button" onClick={() => setIsExpanded((prev) => !prev)}>
            {isExpanded ? "ᐁ" : "ᐅ"}
          </button>
        </td>
        <td>{name}</td>
        <td>{testPlans.length} tests</td>
        <td>
          <button type="button" onClick={showEditDialog}>
            Edit
          </button>
        </td>
      </tr>
      {isExpanded &&
        testPlans.length > 0 &&
        testPlans.map((testPlan, i) => (
          <tr key={i}>
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
