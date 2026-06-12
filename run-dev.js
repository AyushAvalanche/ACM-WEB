const { spawn } = require('child_process');
const path = require('path');

function runService(name, dir) {
  console.log(`[System] Starting ${name} in ${dir}...`);
  
  const child = spawn('npm', ['run', 'dev'], {
    cwd: path.resolve(__dirname, dir),
    shell: true
  });

  child.stdout.on('data', (data) => {
    const lines = data.toString().trim().split('\n');
    lines.forEach(line => {
      if (line) console.log(`[${name}] ${line}`);
    });
  });

  child.stderr.on('data', (data) => {
    const lines = data.toString().trim().split('\n');
    lines.forEach(line => {
      if (line) console.error(`[${name}] ${line}`);
    });
  });

  child.on('close', (code) => {
    console.log(`[System] ${name} exited with code ${code}`);
    process.exit(code || 0);
  });

  return child;
}

const frontend = runService('Frontend', 'frontend');
const backend = runService('Backend', 'backend');

process.on('SIGINT', () => {
  console.log('\n[System] Shutting down services...');
  frontend.kill();
  backend.kill();
  process.exit();
});
