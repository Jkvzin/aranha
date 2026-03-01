const fs = require("fs");
let html = fs.readFileSync("index.html", "utf-8");

// Fix the decade labels (e.g., ANOS 60s -> ANOS 60)
let newHtml = html.replace(/\/\/ ANOS (\d{2})s/g, "// ANOS $1");

// Deduplicate Marvel Team-Up
newHtml = newHtml.replace(
  /\s*{\s*title:\s*"Marvel Team-Up Vol\. 1\s*\(Marvel Team-Up Vol\. 1\)",\s*start:\s*1972,\s*end:\s*1985,\s*type:\s*"Secundária",\s*code:\s*"ssm",\s*description:\s*"Uma revista mensal dedicada a encontros do Homem-Aranha com outros heróis da Marvel."\s*},?/g,
  ""
);

fs.writeFileSync("index.html", newHtml);
