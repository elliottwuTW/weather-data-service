// catch error in an asynchronous operation
module.export = (handler) => (req, res, next) => {
  return Promise.resolve(handler(req, res, next)).catch(next)
}
