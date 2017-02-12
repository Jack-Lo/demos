var client = require('webpack-hot-middleware/client?reload=true')

client.subscribe(function (obj) {
  if (obj.action === 'reload') {
    window.location.reload()
  }
})

client.subscribeAll(function (obj) {
  // console.log(obj)
})