const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf-8');

// The file might already have HTML if they tried to fix it, but let's assume it's pure react code as seen in the last edit.
if (content.includes('<!DOCTYPE html>')) {
  console.log('Already wrapped');
  process.exit(0);
}

const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cacareo</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script type="importmap">
    {
      "imports": {
        "react": "https://esm.sh/react@18.2.0",
        "react-dom/client": "https://esm.sh/react-dom@18.2.0/client",
        "lucide-react": "https://esm.sh/lucide-react@0.292.0"
      }
    }
  </script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');
    body { font-family: 'Inter', sans-serif; }
    /* Hide scrollbar for category menu */
    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel" data-type="module">
import { createRoot } from 'react-dom/client';
${content}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
  </script>
</body>
</html>`;

fs.writeFileSync('index.html', htmlTemplate);
console.log('Successfully wrapped index.html');
