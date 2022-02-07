module.exports = {
apps : [{
    name: 'jobboard',
    script: 'yarn',
    args: 'start',
    env: {
      NODE_ENV: "production",
      PORT: 4000
    },
  }],
  
  deploy : {
    production: {
      user : 'yawik',
      host : 'cross-solution.de',
      ref  : 'origin/main',
      repo : 'https://gitlab.com/yawik/jobboard',
      path : '/home/yawik/yawik.org',
      'pre-deploy-local': 'echo "pre-deploy-local"',
      'post-deploy' : 'yarn && yarn build && pm2 reload ecosystem.config.js --env production -- --port 4000',
      'pre-setup': 'pm2 ps'
    }
  }
};
