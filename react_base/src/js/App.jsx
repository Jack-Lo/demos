import React from 'react'
import ReactDOM from 'react-dom'

import Nav from './components/Nav'
import Clock from './components/Clock'
import Dialog from './components/Dialog'

var Logo = React.createClass({
  render: function() {
    return <div className="m-logo">
      logo
    </div>
  }
})

// var Nav = React.createClass({
//   render: function() {
//     return <div className="m-nav">
//       <a href="#">index</a> <a href="#">about</a> <a href="#">product</a>
//     </div>
//   }
// })

var NewsItem = React.createClass({
  render: function() {
    return <div className="m-news_item">
      item
    </div>
  }
})

var Footer = React.createClass({
  render: function() {
    return <div className="m-footer">
      copy right
    </div>
  }
})

var App = React.createClass({
  getInitialState: function() {
    return {
      isShowDialog: false,
      dialogCnt: 'hello, Jack!'
    }
  },
  render: function() {
    var _t = this

    return <div className="g-index">
      <Logo />
      <Nav />
      <Clock city="广州" />
      <Clock city="北京" />
      <div className="news">
        <NewsItem />
        <NewsItem />
        <NewsItem />
      </div>
      <Footer />
      <Dialog status={_t.state.isShowDialog}
        cnt={_t.state.dialogCnt}
        closeHandler={_t.closeDialog}
        greet={_t.greet} />
    </div>
  },
  componentDidMount: function() {
    var _t = this

    var timer = setTimeout(function() {
      _t.showDialog()
    }, 2000)
  },
  showDialog: function() {
    this.setState({
      isShowDialog: true
    })
  },
  closeDialog: function() {
    this.setState({
      isShowDialog: false
    })
  },
  greet: function(txt) {
    this.setState({
      dialogCnt: txt
    })
  }
})

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

// var App = React.createClass({
//   getInitialState: function() {
//     return {
//       name: 'world'
//     }
//   },
//   componentDidMount: function() {
//     var _t = this

//     if (_t.isMounted()) {
//       setTimeout(() => {
//         _t.setState({
//           name: 'Jack'
//         })
//       }, 2000)
//     }
//   },
//   render: function() {
//     var _t = this

//     return (
//       <h1 onClick={_t.changeName}>hello, {_t.state.name}!</h1>
//     )
//   },
//   changeName: function() {
//     var _t = this

//     _t.setState({
//       name: 'mvvm'
//     })
//   }
// })

// ReactDOM.render(<App />, document.getElementById('root'))







































var vm = window.vm = {
  root: document.getElementById('root'),
  data: {
    name: 'Jack'
  },
  setData: function (key, val) {
    var _t = this
    _t.data[key] = val
    _t.render()
  },
  render: function () {
    var _t = this
    var template = `<h1 onclick="vm.changeName()">hello, {name}!</h1>`
    var html = template.replace(/\{.*\}/g, function (res) {
      var key = res.substr(1, res.length - 2)
      return _t.data[key]
    })
    root.innerHTML = html
  },
  start: function () {
    var _t = this
    _t.render()
    _t.ready()
  },
  ready: function () {
    var _t = this

    setTimeout(function () {
      _t.setData('name', 'mvvm')
    }, 2000)
  },
  changeName: function () {
    var _t = this
    _t.setData('name', '山里育')
  }
}

// vm.start()
