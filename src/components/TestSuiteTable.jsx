import React, { useState } from "react";
import EditDialog from "./EditDialog";
import TestSuiteRow from "./TestSuiteRow";

const TestSuiteTable = ({ testSuites }) => {
  const [isEditDialogOpened, setIsEditDialogOpened] = useState(false);
  const [testSuiteToEdit, setTestSuiteToEdit] = useState(null);

  const showEditDialog = (testSuite) => {
    setIsEditDialogOpened(true);
    setTestSuiteToEdit(testSuite);
  };

  const closeEditDialog = () => {
    setIsEditDialogOpened(false);
    setTestSuiteToEdit(null);
  };

  return (
    <>
      {isEditDialogOpened && (
        <EditDialog testSuite={testSuiteToEdit} onClose={closeEditDialog} />
      )}
      <table>
        <tbody>
          {testSuites.map((testSuite) => (
            <TestSuiteRow
              key={testSuite.id}
              testSuite={testSuite}
              onEditButtonClick={() => showEditDialog(testSuite)}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TestSuiteTable;
