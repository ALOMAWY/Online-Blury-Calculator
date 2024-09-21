let span = document.querySelector(".btns span");

let style = document.createElement("style");

style.innerHTML = `.btns span{
height:${span?.clientWidth}px;
}`;
document.head.appendChild(style);

let resultBar = document.getElementById("result") as HTMLInputElement;
let localStorageResult = localStorage.getItem("result");
if (localStorageResult) {
  resultBar.value = localStorageResult;
}

let spans = Array.from(document.querySelectorAll(".btns span"));

spans.forEach((e) => {
  e.addEventListener("click", () => {
    let span = e as HTMLElement;

    span.style.animation = " pressed 0.1s 1 ease-out";
    setTimeout(() => {
      span.style.animation = "none";
    }, 100);

    if (!resultBar) return;
    if (
      resultBar.getAttribute("data-last") == "opretor" &&
      span.dataset.type == "opretor"
    )
      return false;

    if (span.dataset.type == "number" || span.dataset.type == "opretor") {
      if (
        span.dataset.type == "opretor" &&
        resultBar.value[resultBar.value.length - 1] == span.dataset.action
      )
        if (
          span.dataset.type == "opretor" &&
          resultBar.value[resultBar.value.length - 1]
        )
          return false;

      resultBar.value += span.dataset.action;
    } else if (span.dataset.type == "clear") {
      resultBar.value = "";
      window.localStorage.removeItem("result");
    } else if (span.dataset.type == "remove1") {
      if (resultBar?.value == "") return false;

      if (resultBar)
        resultBar.value = resultBar?.value.slice(0, resultBar.value.length - 1);
    } else if (span.dataset.type == "sqrt") {
      resultBar.value = `${
        !isNaN(Math.sqrt(eval(resultBar.value)))
          ? Math.sqrt(eval(resultBar.value))
          : 0
      }`;
    } else if (span.dataset.type == "result") {
      let resultBarContent = resultBar?.value;

      let result = `${eval(resultBarContent)}`;
      if (resultBar) resultBar.value = result;

      localStorage.setItem("result", result);
    }

    if (span.dataset.type)
      resultBar.setAttribute("data-last", span.dataset.type);
  });
});
