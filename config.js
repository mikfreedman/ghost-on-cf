var path = require('path'),
  config,
  fileStorage,
  storage;

var cfenv = require("cfenv");
var appEnv = cfenv.getAppEnv();

var creds = appEnv.getService("ghost-mysql").credentials;
var database = {
  client: 'mysql',
  connection: creds.uri,
  debug: false
}

var creds = appEnv.getService("ghost-mail").credentials;
var mail = {
  transport: 'SMTP',
  options: {
    host: creds.hostname,
    port: 25,
    service: 'sendgrid',
    auth: {
      user: creds.username,
      pass: creds.password
    }
  }
}

if (!!process.env.S3_ACCESS_KEY_ID) {
  fileStorage = true
  storage = {
    active: 'ghost-s3',
    'ghost-s3': {
      accessKeyId:     process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_ACCESS_SECRET_KEY,
      bucket:          process.env.S3_BUCKET_NAME,
      region:          process.env.S3_BUCKET_REGION,
      assetHost:       process.env.S3_ASSET_HOST_URL
    }
  }
} else {
  fileStorage = false
  storage = {}
}

config = {
  production: {
    url: appEnv.url,
    mail: mail,
    database: database,
    server: {
      host: '0.0.0.0',
      port: appEnv.port,
    },
    paths: {
      contentPath: path.join(__dirname, 'content'),
    },
    fileStorage: fileStorage,
    storage: storage
  }
};

module.exports = config;
