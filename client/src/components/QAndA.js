import React from "react";
export default function QAndA({ QAndA }) {
  return (
    <div>
      <h3 className="question">{QAndA.question}</h3>
      {QAndA.answers.map((answer, i) => {
        // console.log("answer", answer);
        return (
          <div
            key={i}
            className="answer"
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        );
      })}
    </div>
  );
}
