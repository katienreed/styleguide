"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

var createClass = _reactAddons2["default"].createClass;
var Children = _reactAddons2["default"].Children;
var Type = _reactAddons2["default"].PropTypes;
var cloneWithProps = _reactAddons2["default"].addons.cloneWithProps;
exports["default"] = createClass({
  displayName: "FileInput",

  getInitialState: function getInitialState() {
    return {
      previewing: false,
      fileName: null
    };
  },

  propTypes: {
    labelTitle: Type.string.isRequired,
    labelStyles: Type.arrayOf(Type.string).isRequired
  },

  getFile: function getFile() {
    if (this.file) {
      return this.file;
    } else {
      return false;
    }
  },

  handleChange: function handleChange(e) {
    this.file = e.target.files[0];
    var fileName = this.file.name;

    this.setState({
      fileName: fileName,
      previewing: true
    });
  },

  handleRemove: function handleRemove(e) {
    this.file = null;
    this.setState({
      fileName: null,
      previewing: false
    });
  },

  render: function render() {
    if (this.state.previewing) {
      return _reactAddons2["default"].createElement(
        "div",
        { className: "bg-grey-5 grey-75 px2 py1 inline-block rounded-2" },
        _reactAddons2["default"].createElement(
          "div",
          { className: "flex flex-center" },
          _reactAddons2["default"].createElement(
            "span",
            { className: "small mb0" },
            this.state.fileName
          ),
          _reactAddons2["default"].createElement("span", { className: "inline-block icon-delete blue-50 small mb0 ml2", onClick: this.handleRemove })
        )
      );
    } else {
      return _reactAddons2["default"].createElement(
        "div",
        null,
        _reactAddons2["default"].createElement(
          "label",
          { htmlFor: "fileInput", className: this.props.labelStyles.join(' ') },
          this.props.icon ? _reactAddons2["default"].createElement("span", { className: "icon-" + this.props.icon + " mr1" }) : void 0,
          this.props.labelTitle
        ),
        _reactAddons2["default"].createElement("input", _extends({}, this.props, { type: "file", ref: "fileInput", onChange: this.handleChange, id: "fileInput", style: { height: 0, opacity: 0, width: 0 } }))
      );
    }
  }
});
module.exports = exports["default"];