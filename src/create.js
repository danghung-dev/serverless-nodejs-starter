const db = require('./config/db')
const order = require('./models/order')(db.sequelize, db.Sequelize)

order.sync()
module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  const jsonResponseHeaders = {
    'Content-Type': 'application/json',
  }

  const data = JSON.parse(event.body)

  /*
    const params = {
        tenantId: data.tenantId,
        userId: data.userId,
        portalId: data.portalId,
        customerId: data.customerId,
        type: data.type,
        category: data.category,
        keywords: data.keywords,
        status: data.status,
        sysState: data.sysState || 'open',
        createdBy: data.createdBy
    }; */


  order.create(data)
    .then(() => {
      const response = {
        statusCode: 201,
        headers: jsonResponseHeaders,
        body: { success: true },
      }
      callback(null, response)
    }).catch((error) => {
      console.error(error)
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: jsonResponseHeaders,
        body: { success: false, error: `Couldn't create the order, Error inserting into DB, Error: ${error}` },
      })
    })
}


/**
 * Format error responses
 * @param  {Object} schemaErrors - array of json-schema errors, describing each validation failure
 * @return {String} formatted api response
 */
function errorResponse(schemaErrors) {
  const errors = schemaErrors.map(error => ({
    path: error.dataPath,
    message: error.message,
  }))
  return {
    status: 'failed',
    errors,
  }
}
