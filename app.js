// Import necessary modules
import { createServer } from 'http';
import { loadNuxt, buildNuxt } from 'nuxt';
import { default as axios } from 'axios';

// Set environment variables
process.env.DEBUG = "nuxt:*";
const port = process.env.PORT || 3000;

// Import Nuxt configuration
import config from './nuxt.config';

// Create an asynchronous function to setup and run the server
async function start() {
  // Load Nuxt configuration
  const nuxt = await loadNuxt({ for: config.dev ? 'dev' : 'start', config });
console.log(1)
  // Build Nuxt only in development mode
  if (config.dev) {
    await buildNuxt(nuxt);
  }
  console.log(1)

  // Create an HTTP server and use Nuxt to handle requests
  const server = createServer(nuxt.server.app);
  console.log(1)

  // Listen to the specified port
  server.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
  console.log(1)

  // Open a new window using nw.js after a delay
  setTimeout(() => {
    nw.Window.open(`http://localhost:${port}`, { height: 400, width: 600 }, (win) => {});
  }, 2000);
}

// Start the server
start().catch(error => {
  console.error(error);
  process.exit(1);
});
