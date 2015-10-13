import React from 'react';
// var classes = require('classnames');

const Type = React.PropTypes;

var SingleValue = React.createClass({
  	propTypes: {
		placeholder: Type.string,       // this is default value provided by React-Select based component
		value: Type.object              // selected option
	},
	render: function() {

		var classNames = classes('Select-placeholder', this.props.value && this.props.value.className);
		return (
			<div
				className={classNames}
				style={this.props.value && this.props.value.style}
				title={this.props.value && this.props.value.title}
				>{this.props.placeholder}</div>
		);
	}
});

module.exports = SingleValue;
