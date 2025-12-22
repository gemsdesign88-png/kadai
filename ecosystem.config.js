module.exports = {
  apps: [{
    name: 'kadaipos',
    script: 'npm',
    args: 'start',
    cwd: './',
    instances: 1,
    exec_mode: 'fork',
    watch: false,
    max_memory_restart: '500M',
    node_args: '--max-old-space-size=600',
    kill_timeout: 5000,
    listen_timeout: 3000,
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      NODE_OPTIONS: '--max-old-space-size=600'
    }
  }]
};
