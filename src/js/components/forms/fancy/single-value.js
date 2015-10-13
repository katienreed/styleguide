import React from 'React';
var classes = require('classnames');

export default React.createClass({
  	propTypes: {
		placeholder: React.PropTypes.string,       // this is default value provided by React-Select based component
		value: React.PropTypes.object              // selected option
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
