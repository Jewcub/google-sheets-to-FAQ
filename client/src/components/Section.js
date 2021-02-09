import React from "react";
import QAndA from "./QAndA";
export default function Section({ section }) {
  return (
    <div>
      <h2 className="section-title">{section.name}</h2>
      {section.QAndAs.map((qAndA, i) => (
        <QAndA key={i} QAndA={qAndA}></QAndA>
      ))}
    </div>
  );
}
