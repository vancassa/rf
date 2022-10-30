import React, { useState } from "react";
import { validate } from "../utils";

const EditDialog = ({ name, testPlans, onClose }) => {
  const [errorText, setErrorText] = useState("");
  const [editedTestSuiteName, setEditedTestSuiteName] = useState(name);
  const [editedTestPlans, setEditedTestPlans] = useState(testPlans);

  const editTestSuiteName = (e) => {
    const newName = e.target.value;
    setEditedTestSuiteName(newName);
  };

  const editTestPlanField = (index, field, value) => {
    const newTestPlans = [...editedTestPlans];
    newTestPlans[index] = { ...newTestPlans[index], [field]: value };
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
    const { isValid, errorMessage } = validate(
      editedTestSuiteName,
      editedTestPlans
    );
    if (isValid) {
      console.log(editedTestPlans);
      onClose();
    } else {
      setErrorText(errorMessage);
    }
  };

  return (
    <div className="dialog-container" role="dialog" aria-label="Edit dialog">
      <div className="dialog">
        <label htmlFor="testSuiteName">Test suite name</label>
        <input
          id="testSuiteName"
          value={editedTestSuiteName}
          onChange={editTestSuiteName}
        />
        <ul>
          {editedTestPlans.map((testPlan, i) => {
            const { test_name, browser, instruction_count } = testPlan;
            return (
              <li key={i}>
                <input
                  name={`Test name ${i + 1}`}
                  value={test_name}
                  onChange={(e) =>
                    editTestPlanField(i, "test_name", e.target.value)
                  }
                />
                <select
                  name="Browser"
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
                  name="Instruction count"
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
