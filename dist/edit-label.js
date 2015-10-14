'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icon = require('./icon');

var _icon2 = _interopRequireDefault(_icon);

var _popup = require('./popup');

var _popup2 = _interopRequireDefault(_popup);

var _formsFieldError = require('./forms/field-error');

var _formsFieldError2 = _interopRequireDefault(_formsFieldError);

var _lib_colorsJson = require('../../lib/_colors.json');

var _lib_colorsJson2 = _interopRequireDefault(_lib_colorsJson);

var _mixinsOutsideClick = require('./mixins/outside-click');

var _mixinsOutsideClick2 = _interopRequireDefault(_mixinsOutsideClick);

var createClass = _react2['default'].createClass;
var Type = _react2['default'].PropTypes;
exports['default'] = createClass({
  displayName: 'EditLabel',

  mixins: [_mixinsOutsideClick2['default']],

  propTypes: {
    label: Type.string.isRequired,
    placeholder: Type.string,
    isValid: Type.func,
    errorMessage: Type.string,
    onSave: Type.func.isRequired,
    onDelete: Type.func.isRequired
  },

  getInitialState: function getInitialState() {
    return {
      isEditing: false,
      saveDisabled: true,
      hasErrors: false,
      textHeight: 34
    };
  },

  _triggerEdit: function _triggerEdit(e) {
    e.stopPropagation();
    this.setState({ isEditing: true });
  },

  _handleSave: function _handleSave() {
    var val = this.refs.labelInput.getDOMNode().value;

    if (this.props.isValid) {

      if (this.props.isValid(val)) {
        this.setState({ isEditing: false });
        this.props.onSave(val);
      } else {
        this.setState({ hasErrors: true });
      }
    } else {
      this.setState({ isEditing: false });
      this.props.onSave(val);
    }
  },

  _handleClose: function _handleClose(e) {
    e.stopPropagation();
    if (this.refs.pop) {
      this.refs.pop.close();
    }
  },

  _handleDelete: function _handleDelete() {
    this.props.onDelete();
  },

  _handleKey: function _handleKey(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this._handleSave();
    }

    var target = e.target;
    var height = target.scrollHeight;

    this.setState({ textHeight: height });
  },

  _checkContent: function _checkContent(e) {
    var val = e.target.value.trim();

    if (val.length === 0) {
      this.setState({ saveDisabled: true });
    } else if (this.state.saveDisabled) {
      this.setState({ saveDisabled: false });
    }
  },

  _getSaveClasses: function _getSaveClasses() {
    var classes = ['px2', 'small', 'm0'];
    var saveDisabled = this.state.saveDisabled;

    if (saveDisabled) {
      classes.push('grey-25');
    } else {
      classes.push('blue-70');
    }

    return classes;
  },

  _getTextClasses: function _getTextClasses() {
    var classes = ["field-light", "mr2", "py1", "h3", "bold", "no-resize", "flex-grow"];

    if (this.state.hasErrors) {
      classes.push("bc-orange");
    }

    return classes.join(" ");
  },

  _showError: function _showError() {
    return _react2['default'].createElement(
      'div',
      { className: 'fill px2' },
      _react2['default'].createElement(_formsFieldError2['default'], { message: this.props.errorMessage })
    );
  },

  handleOutsideClick: function handleOutsideClick(e) {
    this._handleClose(e);
    this.setState({ isEditing: false });
  },

  render: function render() {
    if (this.state.isEditing) {
      var textStyle = {
        borderColor: this.state.hasErrors ? _lib_colorsJson2['default']["orange"][""] : void 0,
        height: this.state.textHeight,
        width: "auto"
      };

      return _react2['default'].createElement(
        'div',
        { className: 'flex flex-center flex-wrap', ref: 'wrapper' },
        this.state.hasErrors ? this._showError() : void 0,
        _react2['default'].createElement('textarea', {
          className: this._getTextClasses(),
          defaultValue: this.props.label,
          onKeyDown: this.state.saveDisabled ? void 0 : this._handleKey,
          onKeyUp: this._checkContent,
          placeholder: this.props.placeholder,
          ref: 'labelInput',
          style: textStyle
        }),
        _react2['default'].createElement(_icon2['default'], {
          name: 'check',
          extraClasses: this._getSaveClasses(),
          onClick: this.state.saveDisabled ? void 0 : this._handleSave
        }),
        _react2['default'].createElement(
          _popup2['default'],
          { ref: 'pop' },
          _react2['default'].createElement(_icon2['default'], {
            name: 'delete',
            extraClasses: ["blue-70", "px2", "small", "m0"]
          }),
          _react2['default'].createElement(
            'div',
            { className: 'white' },
            _react2['default'].createElement(
              'h4',
              null,
              'Are you sure?'
            ),
            this.props.children,
            _react2['default'].createElement(
              'div',
              { className: 'right-align' },
              _react2['default'].createElement(
                'button',
                { className: 'button-link button-sm button-secondary mr2', onClick: this._handleClose },
                'Cancel'
              ),
              _react2['default'].createElement(
                'button',
                { className: 'button-danger button-sm', onClick: this._handleDelete },
                'Delete'
              )
            )
          )
        )
      );
    } else {
      return _react2['default'].createElement(
        'div',
        { ref: 'wrapper', className: 'flex flex-center hover-container' },
        _react2['default'].createElement(
          'h3',
          { className: 'blue-70 py1 m0' },
          this.props.label
        ),
        _react2['default'].createElement(_icon2['default'], { name: 'pencil', ref: 'pencil', extraClasses: ["blue-70", "py1", "ml1", "small", "m0", "hover-show"], onClick: this._triggerEdit })
      );
    }
  }
});
module.exports = exports['default'];