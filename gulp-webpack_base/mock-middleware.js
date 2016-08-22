var map = {
  hello: {
    data: [1, 2, 3],
    msg: null,
    status: 0
  }
}

module.exports = function (req, res, next) {
  var apiKey = req.params.method

  if (apiKey in map) {
    res.json(map[apiKey])
  } else {
    res.status(404).send('api no found!')
  }
}