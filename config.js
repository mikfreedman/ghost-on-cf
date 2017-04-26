var cfenv = require("cfenv");
var appEnv = cfenv.getAppEnv();
var path = require('path'),
  config;
var pkg   = require("./package.json");
var sqlCredentials = appEnv.getService("ghost-mysql").credentials;

sqlCredentials.database = sqlCredentials.name
sqlCredentials.user = sqlCredentials.username
sqlCredentials.host = sqlCredentials.hostname

var mailCredentials = appEnv.getService("ghost-mail").credentials;
mailCredentials.transport = 'SMTP';

mailCredentials.options = {
  host: mailCredentials.hostname,
  port: 25,
  service: 'sendgrid',
  auth: {
    user: mailCredentials.username,
    pass: mailCredentials.password
  }
}

config = {
  production: {
    url: appEnv.url,
    mail: mailCredentials,
    database: {
      client: 'mysql',
      connection: sqlCredentials,
      debug: false
    },
    server: {
      host: '0.0.0.0',
      port: appEnv.port,
    },
    paths: {
        contentPath: path.join(__dirname, 'content'),
    },
    storage: {
      active: 'ghost-s3',
      'ghost-s3': {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
        bucket: process.env.AWS_BUCKET,
        region: process.env.AWS_REGION,
        assetHost: process.env.AWS_URL
      }
    }
  }
};

module.exports = config;
