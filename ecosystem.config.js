module.exports = {
  apps: [{
    name: 'kadaipos-website',
    script: 'node_modules/next/dist/bin/next',
    args: 'start -p 3000',
    cwd: './',
    instances: 1,
    exec_mode: 'cluster',
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
