import { execSync } from 'child_process';
import { writeFileSync } from 'fs';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT = '/Users/judetenorio/Desktop/Claude/Website/temporary screenshots/';

// Use Chrome DevTools Protocol to capture full page
const script = `
const http = require('http');
const { execSync } = require('child_process');

// Launch Chrome with remote debugging
const proc = require('child_process').spawn('${CHROME}', [
  '--headless=new',
  '--remote-debugging-port=9222',
  '--window-size=1440,900',
  '--hide-scrollbars',
  '--no-sandbox',
  'http://localhost:3000'
], { detached: true, stdio: 'ignore' });

setTimeout(() => {
  try {
    // Get list of targets
    const targets = JSON.parse(execSync('curl -s http://localhost:9222/json').toString());
    const wsUrl = targets[0].webSocketDebuggerUrl;
    console.log('WS:', wsUrl);
    proc.kill();
  } catch(e) {
    console.error(e.message);
    proc.kill();
  }
}, 3000);
`;

console.log('Using Chrome headless directly instead...');
