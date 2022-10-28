import React, { useState } from "react";

const EditDialog = ({ name, testPlans, onClose }) => {
  const [editedTestSuiteName, setEditedTestSuiteName] = useState(name);
  const [editedTestPlans, setEditedTestPlans] = useState(testPlans);

  const editTestPlanField = (index, field, value) => {
    const newTestPlan = [...editedTestPlans];
    newTestPlan[index][field] = value;
    setEditedTestPlans(newTestPlan);
  };

  const submitTestSuite = () => {
    console.log("editedTestPlans :>> ", editedTestPlans);
  };

  return (
    <div className="dialog-container">
      <div className="dialog">
        <input
          value={editedTestSuiteName}
          onChange={(e) => setEditedTestSuiteName(e.target.value)}
        />
        <ul>
          {editedTestPlans.map((testPlan, i) => {
            const { test_name, browser, instruction_count } = testPlan;
            return (
              <li key={i}>
                <input
                  value={test_name}
                  onChange={(e) =>
                    editTestPlanField(i, "test_name", e.target.value)
                  }
                />
                <select
                  value={browser}
                  onChange={(e) =>
                    editTestPlanField(i, "browser", e.target.value)
                  }
                >
                  <option value="chrome" label="Chrome" />
                  <option value="firefox" label="Firefox" />
                  <option value="safari" label="Safari" />
                </select>
                <input
                  type="number"
                  value={instruction_count}
                  onChange={(e) =>
                    editTestPlanField(i, "instruction_count", e.target.value)
                  }
                />{" "}
                steps
              </li>
            );
          })}
        </ul>
        <button onClick={onClose}>Close</button>
        <button onClick={submitTestSuite}>Submit</button>
      </div>
    </div>
  );
};

export default EditDialog;
