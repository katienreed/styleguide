'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var Type = _react2['default'].PropTypes;

exports['default'] = _react2['default'].createClass({
  displayName: "SimpleSelect",

  propTypes: {
    includeBlank: Type.oneOfType([Type.bool, Type.string]),
    options: Type.oneOfType([Type.object, Type.array]).isRequired,
    placeholder: Type.string,
    value: Type.oneOfType([Type.string, Type.number]),
    name: Type.string,
    borderColorClass: Type.string,
    onChange: Type.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      borderColorClass: 'bc-grey-25'
    };
  },

  componentWillMount: function componentWillMount() {
    this.setState({ value: this.props.value || null });
  },

  componentDidMount: function componentDidMount() {
    document.addEventListener('click', this.onDocumentClick);
  },

  componentWillUnmount: function componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentClick);
  },

  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    if (this.state.value != prevState.value) {
      this.props.onChange();
    }
  },

  getInitialState: function getInitialState() {
    return {
      show_options: false
    };
  },

  onDocumentClick: function onDocumentClick(e) {
    var componentNode = this.getDOMNode();
    var targetNode = e.target;
    if (!componentNode.contains(targetNode)) {
      this.setState({ show_options: false });
    }
  },

  onClickOption: function onClickOption(option) {
    this.setState({
      value: option,
      show_options: false
    });
  },

  onClickOptionEmpty: function onClickOptionEmpty() {
    this.setState({
      value: null,
      show_options: false });
  },

  onClickValue: function onClickValue() {
    if (!this.props.disabled) {
      this.setState({ show_options: !this.state.show_options });
    }
  },

  optionsArray: function optionsArray() {
    var options = this.props.options;
    return typeof options === 'object' && Array.isArray(options) ? options : false;
  },

  optionsObject: function optionsObject() {
    var options = this.props.options;
    return typeof options === 'object' && !Array.isArray(options) ? options : false;
  },

  renderValue: function renderValue() {

    var options = this.props.options;
    var value = this.optionsArray() ? this.state.value : this.props.options[this.state.value];

    var valueContainerClasses = ['b', 'bw-1', 'flex', 'flex-justify', 'p2', this.state.show_options ? 'rounded-top-2' : 'rounded-2', this.props.disabled ? 'grey-50' : 'pointer', this.state.show_options ? 'bc-grey-25' : this.props.borderColorClass];
    var valueClasses = ['nowrap', 'mr1'];
    var arrowClasses = ['h6', 'ml1', 'relative', this.props.disabled ? 'grey-50' : 'blue-70', this.state.show_options ? 'icon-arrow-up' : 'icon-arrow-down'];
    var arrowStyle = {
      top: 1
    };

    return _react2['default'].createElement(
      'div',
      { className: valueContainerClasses.join(' '), onClick: this.onClickValue },
      _react2['default'].createElement(
        'div',
        { className: valueClasses.join(' ') },
        value ? value : this.props.placeholder
      ),
      _react2['default'].createElement('div', { className: arrowClasses.join(' '), style: arrowStyle })
    );
  },

  renderOptionsFromObject: function renderOptionsFromObject(classes) {
    var _this = this;

    return Object.keys(this.props.options).map(function (key, index) {
      return _react2['default'].createElement(
        'div',
        { key: index, className: classes.join(' '), onClick: _this.onClickOption.bind(_this, key) },
        _this.props.options[key]
      );
    });
  },

  renderOptionsFromArray: function renderOptionsFromArray(classes) {
    var _this2 = this;

    return this.props.options.map(function (option, index) {
      return _react2['default'].createElement(
        'div',
        { key: index, className: classes.join(' '), onClick: _this2.onClickOption.bind(_this2, option) },
        option
      );
    });
  },

  renderOptions: function renderOptions() {
    var optionsContainerClasses = ['absolute', 'bg-white', 'bb', 'bl', 'br', 'bw-1', 'left-0', 'right-0', 'rounded-bottom-2', this.state.show_options ? 'bc-grey-25' : this.props.borderColorClass];
    var optionClasses = ['bg-white', 'nowrap', 'option', 'pointer', 'p2'];
    var emptyOption = _react2['default'].createElement(
      'div',
      { className: optionClasses.concat('grey-50').join(' '), onClick: this.onClickOptionEmpty },
      typeof this.props.includeBlank == "string" ? this.props.includeBlank : "--"
    );

    var options = this.optionsObject() ? this.renderOptionsFromObject(optionClasses) : this.renderOptionsFromArray(optionClasses);

    return _react2['default'].createElement(
      'div',
      { className: optionsContainerClasses.join(' '), style: { zIndex: 1000 } },
      this.props.includeBlank ? emptyOption : false,
      options
    );
  },

  render: function render() {

    var value = this.renderValue();
    var options = this.renderOptions();

    return _react2['default'].createElement(
      'div',
      { className: 'simple-select relative' },
      _react2['default'].createElement('input', { type: 'hidden', name: this.props.name, value: this.state.value, disabled: this.props.disabled }),
      value,
      this.state.show_options ? options : false
    );
  }
});
module.exports = exports['default'];