const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf-8');

// Extract the original JSX content (everything inside the App component + helper components)
// We know it was wrapped, so let's try to extract just the React part.
// The original un-wrapped file started with "import React..."
let originalCode = content;
if (content.includes('<script type="text/babel" data-type="module">')) {
  originalCode = content.split('<script type="text/babel" data-type="module">')[1].split('</script>')[0];
}

// Remove imports
let modifiedCode = originalCode
  .replace(/import\s+React.*?from\s+['"]react['"];?/gs, 'const { useState, useEffect, useRef } = React;')
  .replace(/import\s+\{\s*createRoot\s*\}\s*from\s+['"]react-dom\/client['"];?/gs, 'const { createRoot } = ReactDOM;')
  .replace(/import\s+\{([^}]+)\}\s*from\s+['"]lucide-react['"];?/gs, 'const {$1} = lucide;');

const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cacareo</title>
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- React and ReactDOM UMD -->
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  
  <!-- Lucide icons UMD -->
  <script src="https://unpkg.com/lucide@latest"></script>
  <script src="https://unpkg.com/lucide-react@latest"></script>
  
  <!-- Babel Standalone -->
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');
    body { font-family: 'Inter', sans-serif; }
    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
${modifiedCode}
  </script>
</body>
</html>`;

fs.writeFileSync('index.html', htmlTemplate);
console.log('Successfully fixed index.html to use UMD builds');
