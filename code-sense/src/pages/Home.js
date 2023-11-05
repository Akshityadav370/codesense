import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import he from "he";

export default function Home() {
  // const [code, setCode] = useState("");
  // const [query, setQuery] = useState("");
  const [analyse, setAnalyse] = useState(false);
  const [message, setMessage] = useState("");
  const [ans, setAns] = useState("");

  const options = {
    method: "POST",
    body: JSON.stringify({
      message: message,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {}, [message, ans]);

  const handleHelp = (e) => {
    e.preventDefault();

    const code = e.target[0].value;
    const query = e.target[1].value;

    // setCode(code);
    // setQuery(query);
    // const temp = `
    // [User's Query]: ${query};

    // [Code]:

    // ${code};

    // [Context]:
    // You are a code helper bot, answer the given query of the user in less than 300 tokens, code will also be provided to you.;

    // [Conditional]:
    // If the user's query is not related to code or not related to programming, please respond with "Type appropriate query for the code.";
    // `;
    const temp = `
    [User's Query]: ${query};

[Code]:

${code};

[Context]:
You are a code helper bot. Please answer the given query of the user only if it is related to programming or code. If the user's query is not related to code or programming, please respond with "Type appropriate query for the code."
`;
    // const temp1 = "What is Macbook?";
    setMessage(temp);
    // console.log(message);
    setAnalyse(true);
    // console.log(code, query);
  };

  const sendRequest = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/completions",
        options
      );
      const data = await response.json();

      if (data.error) {
        setAns(data.error.message);
      } else {
        // const sentence = (data.choices[0].message.content).replace(/\b\n\b/g, "<br/>");
        // const contentWithLineBreaks = data.choices[0].message.content.replace(
        //   /\n/g,
        //   "<br/>"
        // );
        const content = data.choices[0].message.content;

        setAns(he.decode(content));
        // setAns(contentWithLineBreaks);
      }

      setAnalyse(false);
    } catch (error) {
      console.log(ans, error);
      setAns(error);
      console.log(ans, error);
    }
  };

  return (
    <>
      <div className="heading-div">
        <p className="heading">Code Sense</p>
      </div>
      <div className="home">
        <div className="codes">
          <form onSubmit={handleHelp}>
            <div className="codes-submit">
              <label>Code</label>
              <textarea
                placeholder="Enter code here"
                required
                rows={"10"}
                cols={"55"}
              ></textarea>
            </div>
            <div className="codes-submit">
              <label>Query</label>
              <textarea
                placeholder="Enter your query here"
                required
                rows={"10"}
                cols={"55"}
              ></textarea>
            </div>
            <div className="left-side-buttons">
              <button type="submit">Save</button>
              {analyse && <button onClick={sendRequest}>Analyze!</button>}
            </div>
          </form>
        </div>
        <div className="codes">
          {analyse ? (
            // Show a loading indicator while waiting for the response
            <div className="loader">Loading...</div>
          ) : (
            // Display the response or your textarea when not loading
            <textarea
              className="reply-textarea"
              value={ans}
              rows={"30"}
              cols={"55"}
              readOnly
            />
          )}
          {/* <textarea
            className="reply-textarea"
            value={ans}
            rows={"30"}
            cols={"55"}
            readOnly
          /> */}
          {/* <div className="reply" dangerouslySetInnerHTML={{ __html: ans }} /> */}
        </div>
      </div>
      <div>
        <button onClick={() => signOut(auth)} className="logout">
          Logout
        </button>
      </div>
    </>
  );
}
