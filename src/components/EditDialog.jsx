import React, { useState } from "react";

const EditDialog = ({ name, testPlans, onClose }) => {
  const [errorText, setErrorText] = useState("");
  const [editedTestSuiteName, setEditedTestSuiteName] = useState(name);
  const [editedTestPlans, setEditedTestPlans] = useState(testPlans);

  const editTestSuiteName = (e) => {
    const newName = e.target.value;
    console.log("newName :>> ", newName);
    if (newName === "") {
      setErrorText("Test suite name should not be empty");
    } else {
      setEditedTestSuiteName(newName);
    }
  };

  const editTestPlanField = (index, field, value) => {
    const newTestPlans = [...editedTestPlans];
    newTestPlans[index][field] = value;
    setEditedTestPlans(newTestPlans);
  };

  const addTestPlan = () => {
    const newTestPlans = [
      ...editedTestPlans,
      { test_name: "New test plan", browser: "chrome", instruction_count: 1 },
    ];
    setEditedTestPlans(newTestPlans);
  };

  const deleteTestPlan = (index) => {
    if (editedTestPlans.length === 1) {
      setErrorText("A test suite must contain at least one plan");
    } else {
      const newTestPlans = [...editedTestPlans];
      newTestPlans.splice(index, 1);
      setEditedTestPlans(newTestPlans);
    }
  };

  const submitTestSuite = () => {
    console.log("editedTestPlans :>> ", editedTestPlans);
    onClose();
  };

  return (
    <div className="dialog-container">
      <div className="dialog">
        <input value={editedTestSuiteName} onChange={editTestSuiteName} />
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
                <button
                  type="button"
                  style={{ marginLeft: "5px" }}
                  onClick={() => deleteTestPlan(i)}
                >
                  X
                </button>
              </li>
            );
          })}
        </ul>

        <div style={{ color: "red", marginBottom: 20 }}>{errorText}</div>

        <div>
          <button type="button" onClick={addTestPlan}>
            Add test plan
          </button>
        </div>

        <button type="button" onClick={submitTestSuite}>
          Submit
        </button>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default EditDialog;
