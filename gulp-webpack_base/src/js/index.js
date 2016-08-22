var reqwest = require('reqwest')
require('../sass/index')
console.log('index')

reqwest({
  url: '/api/hello'
}).then(function (res) {
  console.log(res)
})