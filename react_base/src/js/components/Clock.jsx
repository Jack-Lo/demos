import React, { Component, PropTypes } from 'react'

var Clock = React.createClass({
  getInitialState: function() {
    return {
      time: new Date().toString()
    }
  },
  render: function() {
    var _t = this

    return <div className="m-clock">
      {_t.props.city}: {_t.state.time}
    </div>
  },
  componentDidMount: function() {
    var _t = this

    var timer = setInterval(function () {
      if (_t.isMounted()) {
        _t.setState({
          time: new Date().toString()
        })
      } else {
        clearInterval(timer)
      }
    }, 1000)
  }
})

export default Clock