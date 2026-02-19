module.exports = {
  apps: [
    {
      name: 'wayme',
      // cwd: __dirname,
      script: 'npm',
      args: 'run preview -- --host',
      env: {
        NODE_ENV: 'production',
        PORT: 5173,
      },
    },
  ],
}
