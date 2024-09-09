"use strict";
let span = document.querySelector(".btns span");
let style = document.createElement("style");
style.innerHTML = `.btns span{
height:${span === null || span === void 0 ? void 0 : span.clientWidth}px;
}`;
document.head.appendChild(style);
let resultBar = document.getElementById("result");
let localStorageResult = localStorage.getItem("result");
if (localStorageResult) {
    resultBar.value = localStorageResult;
}
let spans = Array.from(document.querySelectorAll(".btns span"));
spans.forEach((e) => {
    e.addEventListener("click", () => {
        let span = e;
        span.style.animation = " pressed 0.1s 1 ease-out";
        setTimeout(() => {
            span.style.animation = "none";
        }, 100);
        console.log(span);
        if (!resultBar)
            return;
        if (span.dataset.type == "number" || span.dataset.type == "opretor") {
            if (span.dataset.type == "opretor" &&
                resultBar.value[resultBar.value.length - 1] == span.dataset.action)
                return false;
            resultBar.value += span.dataset.action;
        }
        else if (span.dataset.type == "clear") {
            resultBar.value = "";
            window.localStorage.removeItem("result");
        }
        else if (span.dataset.type == "remove1") {
            if ((resultBar === null || resultBar === void 0 ? void 0 : resultBar.value) == "")
                return false;
            if (resultBar)
                resultBar.value = resultBar === null || resultBar === void 0 ? void 0 : resultBar.value.slice(0, resultBar.value.length - 1);
        }
        else if (span.dataset.type == "result") {
            let resultBarContent = resultBar === null || resultBar === void 0 ? void 0 : resultBar.value;
            let result = `${eval(resultBarContent)}`;
            if (resultBar)
                resultBar.value = result;
            localStorage.setItem("result", result);
        }
    });
});
// Get the first <span> inside .btns, if exists
// let span = document.querySelector<HTMLElement>(".btns span");
// let style = document.createElement("style");
// // Optional chaining used in case `span` is null
// style.innerHTML = `.btns span{
//   height: ${span?.clientWidth}px;
// }`;
// // Append the <style> element to the document head
// document.head.appendChild(style);
// // Get the result input field (assuming it's an <input> or <textarea> element)
// let resultBar = document.getElementById("result") as HTMLInputElement | null;
// // Ensure that spans is an array of HTMLElements
// let spans = Array.from(document.querySelectorAll<HTMLElement>(".btns span"));
// // Add event listeners to each span
// spans.forEach((e) => {
//   e.addEventListener("click", () => {
//     // Make sure resultBar exists before accessing its properties
//     if (!resultBar) return;
//     if (e.dataset.type === "number" || e.dataset.type === "opretor") {
//       // Prevent adding duplicate operator
//       if (
//         e.dataset.type === "opretor" &&
//         resultBar.value[resultBar.value.length - 1] === e.dataset.action
//       ) {
//         return false;
//       }
//       resultBar.value += e.dataset.action || "";
//     } else if (e.dataset.type === "clear") {
//       resultBar.value = "";
//     } else if (e.dataset.type === "remove1") {
//       if (resultBar.value === "") return false;
//       resultBar.value = resultBar.value.slice(0, resultBar.value.length - 1);
//     } else if (e.dataset.type === "result") {
//       let resultBarContent = resultBar.value;
//       try {
//         // Use eval cautiously
//         resultBar.value = `${eval(resultBarContent)}`;
//       } catch (error) {
//         console.error("Invalid expression", error);
//       }
//     }
//   });
// });
