import { useState } from "react";
import { useEffect } from "react";
import TestSuiteTable from "./components/TestSuiteTable";

function App() {
  const [testSuites, setTestSuites] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3456/test_suites")
      .then((res) => res.json())
      .then((data) => {
        setTestSuites(data);
      });
  }, []);

  return (
    <div className="App">
      <TestSuiteTable testSuites={testSuites} />
    </div>
  );
}

export default App;
