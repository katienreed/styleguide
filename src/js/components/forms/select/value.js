import React from 'react';
// var classes = require('classnames');

const Type = React.PropTypes;

export default React.createClass({

	displayName: 'Value',

	propTypes: {
		disabled: Type.bool,                   // disabled prop passed to ReactSelect
		onOptionLabelClick: Type.func,         // method to handle click on value label
		onRemove: Type.func,                   // method to handle remove of that value
		option: Type.object.isRequired,        // option passed to component
		optionLabelClick: Type.bool,           // indicates if onOptionLabelClick should be handled
		renderer: Type.func                    // method to render option label passed to ReactSelect
	},

	blockEvent: function(event) {
		event.stopPropagation();
	},

	handleOnRemove: function(event) {
		if (!this.props.disabled) {
			this.props.onRemove(event);
		}
	},

	render: function() {
		var label = this.props.option.label;
		if (this.props.renderer) {
			label = this.props.renderer(this.props.option);
		}

		if(!this.props.onRemove && !this.props.optionLabelClick) {
			return (
				<div
					className={classes('Select-value', this.props.option.className)}
					style={this.props.option.style}
					title={this.props.option.title}
				>{label}</div>
			);
		}

		if (this.props.optionLabelClick) {

			label = (
				<a className={classes('Select-item-label__a', this.props.option.className)}
					onMouseDown={this.blockEvent}
					onTouchEnd={this.props.onOptionLabelClick}
					onClick={this.props.onOptionLabelClick}
					style={this.props.option.style}
					title={this.props.option.title}>
					{label}
				</a>
			);
		}

		return (
			<div className={classes('Select-item', this.props.option.className)}
				 style={this.props.option.style}
				 title={this.props.option.title}>
				<span className="Select-item-icon"
					onMouseDown={this.blockEvent}
					onClick={this.handleOnRemove}
					onTouchEnd={this.handleOnRemove}>&times;</span>
				<span className="Select-item-label">{label}</span>
			</div>
		);
	}

});
