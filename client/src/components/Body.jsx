import Section from "./Section";
import { useState } from "react";

export default function Body({ content }) {
  const [selected, setSelected] = useState(content.sections[0].name);
  console.log({ content });
  return (
    <div className="faq-body">
      {content.sections.map((section, i) => (
        <button
          className="section-title"
          key={i}
          onClick={() => setSelected(section.name)}
        >
          {section.name}
        </button>
      ))}
      {content.sections.map((section, i) =>
        section.name === selected ? (
          <Section className="section-body" key={i} section={section}></Section>
        ) : (
          ""
        )
      )}
    </div>
  );
}
