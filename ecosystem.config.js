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
      'pre-deploy-local': 'rsync -ra --exclude=node_modules --exclude=frankfurt-im-nebel.jpg --delete dist/ssr/ yawik@cross-solution.de:/home/yawik/yawik.org/source/dist/ssr/',
      'post-deploy' : 'pm2 reload yawik.org/source/ecosystem.config.js --env production -- --port 4000',
      'pre-setup': 'pm2 ps'
    }
  }
};
