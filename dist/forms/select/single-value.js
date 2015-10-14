'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

// var classes = require('classnames');

var Type = _react2['default'].PropTypes;

var SingleValue = _react2['default'].createClass({
	displayName: 'SingleValue',

	propTypes: {
		placeholder: Type.string, // this is default value provided by React-Select based component
		value: Type.object // selected option
	},
	render: function render() {

		var classNames = classes('Select-placeholder', this.props.value && this.props.value.className);
		return _react2['default'].createElement(
			'div',
			{
				className: classNames,
				style: this.props.value && this.props.value.style,
				title: this.props.value && this.props.value.title
			},
			this.props.placeholder
		);
	}
});

module.exports = SingleValue;