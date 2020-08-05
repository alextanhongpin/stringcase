const { stringCase } = require("@alextanhongpin/stringcase");

const CASES = "camel snake kebab pascal".split(" ");
const $ = el => document.getElementById(el);
$("input").addEventListener("input", evt => {
  const value = evt.currentTarget.value;
  if (!value) return;
  const str = stringCase(value);
  $("output").textContent = [
    `Detected stringcase: ${str.constructor.name}`,
    ...CASES.map(caseType => [caseType, str[caseType]].join(": "))
  ].join("\n");
});
