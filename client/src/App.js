import "./App.css";
import React, { useState, useEffect } from "react";
import Section from "./components/Section";
function App() {
  const [faqHTML, setFaqHTML] = useState(0);
  const start = async () => {
    console.log("NODE_ENV: ", process.env.NODE_ENV);
    setFaqHTML(`<p>loading...</p>`);
    const faqReq = await fetch("/api/get-faq");
    const data = await faqReq.json();
    console.log({ data });
    setFaqHTML(JSON.parse(data.faq));
    console.log({ faqHTML });
  };
  useEffect(() => {
    start();
  }, []);
  return (
    <div className="App">
      <h1> KAVA FAQ</h1>
      {faqHTML.sections
        ? faqHTML.sections.map((section, i) => (
            <Section key={i} section={section}></Section>
          ))
        : "loading...."}
    </div>
  );
}

export default App;
