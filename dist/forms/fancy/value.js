'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Type = _react2['default'].PropTypes;

var Value = _react2['default'].createClass({

	displayName: 'Value',

	propTypes: {
		disabled: _react2['default'].PropTypes.bool, // disabled prop passed to ReactSelect
		onOptionLabelClick: _react2['default'].PropTypes.func, // method to handle click on value label
		onRemove: _react2['default'].PropTypes.func, // method to handle remove of that value
		option: _react2['default'].PropTypes.object.isRequired, // option passed to component
		optionLabelClick: _react2['default'].PropTypes.bool, // indicates if onOptionLabelClick should be handled
		renderer: _react2['default'].PropTypes.func // method to render option label passed to ReactSelect
	},

	blockEvent: function blockEvent(event) {
		event.stopPropagation();
	},

	handleOnRemove: function handleOnRemove(event) {
		if (!this.props.disabled) {
			this.props.onRemove(event);
		}
	},

	render: function render() {
		var label = this.props.option.label;
		if (this.props.renderer) {
			label = this.props.renderer(this.props.option);
		}

		if (!this.props.onRemove && !this.props.optionLabelClick) {
			return _react2['default'].createElement('div', {
				className: classes('Select-value', this.props.option.className),
				style: this.props.option.style,
				title: this.props.option.title
			}, label);
		}

		if (this.props.optionLabelClick) {

			label = _react2['default'].createElement('a', { className: classes('Select-item-label__a', this.props.option.className),
				onMouseDown: this.blockEvent,
				onTouchEnd: this.props.onOptionLabelClick,
				onClick: this.props.onOptionLabelClick,
				style: this.props.option.style,
				title: this.props.option.title }, label);
		}

		return _react2['default'].createElement('div', { className: classes('Select-item', this.props.option.className),
			style: this.props.option.style,
			title: this.props.option.title }, _react2['default'].createElement('span', { className: 'Select-item-icon',
			onMouseDown: this.blockEvent,
			onClick: this.handleOnRemove,
			onTouchEnd: this.handleOnRemove }, '×'), _react2['default'].createElement('span', { className: 'Select-item-label' }, label));
	}

});

module.exports = Value;