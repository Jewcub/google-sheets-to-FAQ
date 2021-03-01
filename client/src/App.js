import "./App.css";
import React, { useState, useEffect } from "react";
import Body from "./components/Body.jsx";
function App() {
  const [faqJSON, setfaqJSON] = useState({ sections: null });
  const start = async () => {
    // console.log("NODE_ENV: ", process.env.NODE_ENV);
    const faqReq = await fetch("/api/get-faq");
    const data = await faqReq.json();
    await setfaqJSON(JSON.parse(data.faq));
    // console.log({ faqJSON });
  };
  useEffect(() => {
    start();
  }, []);
  return (
    <div className="App">
      <h1> KAVA FAQ</h1>
      {faqJSON.sections ? <Body content={faqJSON}></Body> : "loading...."}
    </div>
  );
}

export default App;
