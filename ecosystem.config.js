module.exports = {
  apps : [{
    name: 'app',
    script: 'server.js',
    env_production: {
      NODE_ENV: "production"
    },
    env_development: {
        NODE_ENV: "development"
    },
    instances : "3",
    exec_mode : "cluster",
    watch: '.',
    env: { "PORT": 1337 },
    increment_var : 'PORT'
  }],
};
