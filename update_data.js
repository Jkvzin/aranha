const fs = require('fs');

const indexContent = fs.readFileSync('index.html', 'utf8');

const jsDataContent = fs.readFileSync('js_data.js', 'utf8');

const regex = /const publicationData = \[([\s\S]*?)\];/;

const updatedContent = indexContent.replace(regex, jsDataContent);

fs.writeFileSync('index.html', updatedContent, 'utf8');
console.log('Successfully updated index.html');
