'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('core-js/shim');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Type = _react2['default'].PropTypes;

exports['default'] = _react2['default'].createClass({
  displayName: "GridBlock",

  colContent: function colContent() {
    return this.props.colContent || this.props.colClass;
  },

  render: function render() {
    return _react2['default'].createElement(
      'div',
      { className: "grid-block " + this.props.colClass },
      _react2['default'].createElement(
        'p',
        { className: 'col-class' },
        this.colContent()
      )
    );
  }
});
module.exports = exports['default'];