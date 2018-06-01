module.exports = {
  env: process.env.NODE_ENV,
  bodyLimit: process.env.bodyLimit || '100kb',
  jwt_secret: process.env.JWT_KEY || '',
  log_server: process.env.LOG_SERVER || null,
  log_server_port: process.env.LOG_SERVER_PORT || null,
}
