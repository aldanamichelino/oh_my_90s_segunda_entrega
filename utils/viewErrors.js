const viewErrorHandler = (error, res) => {
  return res.render('main', {error: error})
}

module.exports = {
  viewErrorHandler
}