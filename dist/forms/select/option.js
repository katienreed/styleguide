'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

// var classes = require('classnames');

var Type = _react2['default'].PropTypes;

exports['default'] = _react2['default'].createClass({
	displayName: 'option',

	propTypes: {
		addLabelText: Type.string, // string rendered in case of allowCreate option passed to ReactSelect
		className: Type.string, // className (based on mouse position)
		mouseDown: Type.func, // method to handle click on option element
		mouseEnter: Type.func, // method to handle mouseEnter on option element
		mouseLeave: Type.func, // method to handle mouseLeave on option element
		option: Type.object.isRequired, // object that is base for that option
		renderFunc: Type.func // method passed to ReactSelect component to render label text
	},

	blockEvent: function blockEvent(event) {
		event.preventDefault();
		if (event.target.tagName !== 'A' || !('href' in event.target)) {
			return;
		}

		if (event.target.target) {
			window.open(event.target.href);
		} else {
			window.location.href = event.target.href;
		}
	},

	render: function render() {
		var obj = this.props.option;
		var renderedLabel = this.props.renderFunc(obj);
		var optionClasses = classes(this.props.className, obj.className);

		return obj.disabled ? _react2['default'].createElement(
			'div',
			{ className: optionClasses,
				onMouseDown: this.blockEvent,
				onClick: this.blockEvent },
			renderedLabel
		) : _react2['default'].createElement(
			'div',
			{ className: optionClasses,
				style: obj.style,
				onMouseEnter: this.props.mouseEnter,
				onMouseLeave: this.props.mouseLeave,
				onMouseDown: this.props.mouseDown,
				onClick: this.props.mouseDown,
				title: obj.title },
			obj.create ? this.props.addLabelText.replace('{label}', obj.label) : renderedLabel
		);
	}
});

module.exports = Option;
module.exports = exports['default'];