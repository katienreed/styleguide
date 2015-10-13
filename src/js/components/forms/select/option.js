import React from 'react';
// var classes = require('classnames');

const Type = React.PropTypes;

export default React.createClass({
		propTypes: {
		addLabelText: Type.string,          // string rendered in case of allowCreate option passed to ReactSelect
		className: Type.string,             // className (based on mouse position)
		mouseDown: Type.func,               // method to handle click on option element
		mouseEnter: Type.func,              // method to handle mouseEnter on option element
		mouseLeave: Type.func,              // method to handle mouseLeave on option element
		option: Type.object.isRequired,     // object that is base for that option
		renderFunc: Type.func               // method passed to ReactSelect component to render label text
	},

	blockEvent: function(event) {
		event.preventDefault();
		if ((event.target.tagName !== 'A') || !('href' in event.target)) {
			return;
		}

		if (event.target.target) {
			window.open(event.target.href);
		} else {
			window.location.href = event.target.href;
		}
	},

	render: function() {
		var obj = this.props.option;
		var renderedLabel = this.props.renderFunc(obj);
		var optionClasses = classes(this.props.className, obj.className);

		return obj.disabled ? (
			<div className={optionClasses}
				onMouseDown={this.blockEvent}
				onClick={this.blockEvent}>
				{renderedLabel}
			</div>
		) : (
			<div className={optionClasses}
				 style={obj.style}
				 onMouseEnter={this.props.mouseEnter}
				 onMouseLeave={this.props.mouseLeave}
				 onMouseDown={this.props.mouseDown}
				 onClick={this.props.mouseDown}
				 title={obj.title}>
				{ obj.create ? this.props.addLabelText.replace('{label}', obj.label) : renderedLabel }
			</div>
		);
	}
});

module.exports = Option;
