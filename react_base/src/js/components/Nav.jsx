import React, { Component, PropTypes } from 'react'

var Nav = React.createClass({
  render: function() {
    return (
      <h1>
        <a href="/">首页</a> | <a href="/">关于</a> | <a href="/">产品</a>
      </h1>
    );
  }
})

export default Nav