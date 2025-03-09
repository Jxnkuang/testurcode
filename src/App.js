import "./App.css";
import testCases from "./testCases.json"
import axios from "axios";
import { useState } from "react";

function App() {
  const firstTestCase = testCases[0];
  const secondTestCase = testCases[1];
  const [userResults, setUserResults] = useState(""); 

  const runCode = async () => {
    let results = "";

    for (let i = 0; i < testCases.length; i++) {
    await new Promise(r => setTimeout(r, 500));
    const code = document.getElementById("codeArea").value;
    const language = document.getElementById("codeLanguage").value;
    const input = testCases[i].input;

      try {
        const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
          language: language,
          version: "*",
          files: [{ name: "code", content: code }],
          stdin: input
        }, { timeout: 2000 }); 

        const expectedOutput = testCases[i].expectedOutput;
        const actualOutput = response.data.run.output.toString().trim();
        results += actualOutput === expectedOutput ? "✅ " : "❌ ";
      } catch (error) {
        results += "❌ "; 
        alert("Can't run because " + error);
      }
    }
    setUserResults(results); 
  };

  return (
    <div className = "testing">
      <section className = "leftSide">
        <div className = "problem">
          <h1> Problem </h1>
          <p>
            You are given two integers K and N. Compute the sum of all integers from 1 to N (inclusive) that are not divisible by K.          
          </p>
          <p>
            Input: A single line containing two integers K and N (1 ≤ K ≤ 10⁹, 1 ≤ N ≤ 10⁹) split by a space.
          </p>
          <p>
            Output: For each test case, print the integer fitting the requirements. 
          </p>
          <br></br>
          <hr></hr>
        </div>
        <div className = "example">
          <h1> Example </h1>
            <div className = "firstExample">
              <p><strong>Input:</strong> {firstTestCase.input}</p>
              <p><strong>Output:</strong> {firstTestCase.expectedOutput}</p>
            </div>
            <div className = "secondExample">
              <p><strong>Input:</strong> {secondTestCase.input}</p>
              <p><strong>Output:</strong> {secondTestCase.expectedOutput}</p>
            </div>
        </div>
      </section>
      <section className = "rightSide">
        <h1> Test Code </h1>
        <textarea id = "codeArea"></textarea>
        <div className = "submission">
          <select name = "language" id = "codeLanguage">
              <option value = "python">Python</option>
              <option value = "javascript">Javascript</option>
              <option value = "java">Java</option>
              <option value = "c">C</option>
              <option value = "cpp">C++</option>
              <option value = "csharp">C#</option>
          </select>
          <button onClick = {runCode}>Run Code</button>
        </div>
          <h1> Results: {userResults} </h1>
      </section>
    </div>
  );
}

export default App;
