import React, { Component, PropTypes } from 'react'

var Dialog = React.createClass({
  render: function() {
    var _t = this

    if (!_t.props.status) {
      return null
    }

    return <div className="m-dialog">
      {_t.props.cnt}
      <div>
        <button onClick={_t.props.closeHandler}>关闭</button>
        <button onClick={_t.greetToLeader}>向领导问好</button>
      </div>
    </div>
  },
  greetToLeader: function() {
    this.props.greet('领导好！')
  }
})

export default Dialog