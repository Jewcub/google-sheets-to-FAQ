console.log("hello from js file");

const getFAQsfromServer = async () => {
  const res = await fetch(window.location.href + "get-faqs");
  return await res.json();
};

const FAQItem = (FAQ) =>
  `<li class="faq-set">
    <h3 class="question">${FAQ.question}</h3>
    <p class="answer">${FAQ.answer}</p>
  </li>`;

const list = (listItems) => `<ul>${listItems}</ul>`;

window.addEventListener("DOMContentLoaded", async () => {
  const FAQs = await getFAQsfromServer();
  const app = document.getElementById("faq-list");
  app.innerText = "";

  let listItemsTemplate = "";
  FAQs.forEach((FAQ) => (listItemsTemplate += FAQItem(FAQ)));
  // console.log({ listItemsTemplate });
  const listHTML = list(listItemsTemplate);
  console.log({ listHTML });
  app.innerHTML = listHTML;

  const questions = document.querySelectorAll(".faq-set");
  const showHideAnswer = (ev, el) => {
    el.childNodes.forEach((node) => {
      if (node.className === "answer") node.className = "answer-show";
      else if (node.className === "answer-show") node.className = "answer";
    });
  };
  questions.forEach((el) => {
    el.addEventListener("click", (ev) => {
      showHideAnswer(ev, el);
    });
  });
});
