const fs = require("fs");
let html = fs.readFileSync("index.html", "utf-8");

const oldDataMatch = html.match(/const publicationData = \[([\s\S]*?)\];/);
if (!oldDataMatch) {
  console.error("Could not find publicationData");
  process.exit(1);
}

// Ensure the old data is evaluable
const oldArrayString = `[${oldDataMatch[1]}]`;
const oldArray = eval(oldArrayString);

// Read the new items
const newContentString = fs.readFileSync("new_data.js", "utf-8");

// Prepare to eval the new ones
let cleanedNew = newContentString.replace(/\/\/.*/g, ""); // Remove // comments
// Wrap the loose objects in an array string
const newArrayString = `[${cleanedNew}]`;
const newArray = eval(newArrayString);

const combinedArray = [...oldArray, ...newArray];

// Sort chronologically
combinedArray.sort((a, b) => {
  if (a.start !== b.start) {
    return a.start - b.start;
  }
  return a.title.localeCompare(b.title);
});

// Format the output
let formattedOutput = "const publicationData = [\n";
let currentDecade = 0;

for (let i = 0; i < combinedArray.length; i++) {
  const item = combinedArray[i];

  // Calculate decade
  const decade = Math.floor(item.start / 10) * 10;

  if (decade !== currentDecade) {
    if (i !== 0) formattedOutput += "\n";
    formattedOutput += `    // ANOS ${decade === 2000 ? "2000" : decade.toString().substring(2) + "s"}\n`;
    currentDecade = decade;
  }

  // Properly escape quotes in description
  const cleanDescription = item.description.replace(/"/g, '\\"');

  formattedOutput += `    { title: "${item.title}", start: ${item.start}, end: ${item.end}, type: "${item.type}", code: "${item.code}", description: "${cleanDescription}" }${i === combinedArray.length - 1 ? "" : ","}\n`;
}
formattedOutput += "];";

const newHtml = html.replace(/const publicationData = \[[\s\S]*?\];/, formattedOutput);
fs.writeFileSync("index.html", newHtml);
