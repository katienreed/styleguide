'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Type = _react2['default'].PropTypes;

exports['default'] = _react2['default'].createClass({
  displayName: "NumberField",

  propTypes: {
    disabled: Type.bool,
    extraClasses: Type.arrayOf(Type.string),
    fieldColor: Type.oneOf(['light', 'dark']),
    label: Type.string,
    readOnly: Type.bool,
    units: Type.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      readOnly: false,
      fieldColor: 'light',
      inactive: false
    };
  },

  label: function label() {
    if (this.props.label) {
      return _react2['default'].createElement(
        'label',
        { className: 'px2 mb1' },
        this.props.label
      );
    }
  },

  units: function units() {
    if (this.props.units) {
      return _react2['default'].createElement(
        'span',
        { className: this.unitsClasses() },
        this.props.units
      );
    }
  },

  unitsClasses: function unitsClasses() {
    var classes = ['units'];
    classes.push('grey-50');
    return classes.join(' ');
  },

  iconClasses: function iconClasses() {
    var classes = ['icon', 'icon-arrow-double'];
    this.props.disabled ? classes.push('grey-25') : classes.push('blue-70');
    return classes.join(' ');
  },

  fieldClasses: function fieldClasses() {
    var classes = [];
    classes.push('field-' + this.props.fieldColor);
    return classes.join(' ');
  },

  classes: function classes() {
    var classes = ['number-field'];
    if (this.props.disabled) {
      classes.push('disabled');
    }
    classes.push(this.props.extraClasses);
    return classes.join(' ');
  },

  render: function render() {
    return _react2['default'].createElement(
      'div',
      { className: this.classes() },
      this.label(),
      _react2['default'].createElement('br', null),
      _react2['default'].createElement('input', {
        className: this.fieldClasses(),
        disabled: this.props.disabled,
        type: 'number',
        readOnly: this.props.readOnly
      }),
      _react2['default'].createElement('span', { className: this.iconClasses() }),
      this.units()
    );
  }
});
module.exports = exports['default'];