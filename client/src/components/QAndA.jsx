import { useState } from "react";
export default function QAndA({ QAndA }) {
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <div>
      <h3 onClick={() => setShowAnswer(!showAnswer)} className="question">
        {QAndA.question}
      </h3>
      {showAnswer
        ? QAndA.answers.map((answer, i) => {
            // console.log("answer", answer);
            return (
              <div
                key={i}
                className="answer"
                dangerouslySetInnerHTML={{ __html: answer }}
              />
            );
          })
        : ""}
    </div>
  );
}
