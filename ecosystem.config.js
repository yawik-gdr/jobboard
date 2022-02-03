module.exports = {
apps : [{
    name: 'jobboard',
    script: 'yarn',
    args: 'start',
    env: {
      NODE_ENV: "production",
      PORT: 3000
    },
  }],
  
  deploy : {
    production: {
      user : 'yawik',
      host : 'cross-solution.de',
      ref  : 'origin/main',
      repo : 'https://gitlab.com/cross-solution/homepage',
      path : '/home/yawik/yawik.org',
      'pre-deploy-local': 'echo "pre-deploy-local"',
      'post-deploy' : 'yarn && yarn build && pm2 reload ecosystem.config.js --env production -- --port 3000',
      'pre-setup': 'pm2 ps'
    }
  }
};
