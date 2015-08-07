import React from 'react';

const Type = React.PropTypes;

/**
 * A container component to layout a group of Buttons
 */
export default React.createClass({
  displayName: "ButtonGroup",

  propTypes: {
   type: Type.oneOf(['actions']),
   children: Type.node.isRequired,
   extraClasses: Type.arrayOf(Type.string)
  },

  createClass: function(value) {
    return "button-group-" + value;
  },

  classes: function() {
    var classes = ["button-group"];
    var props = this.props;

    if (props.type) {
      classes.push(this.createClass(props.type));
    }

    if (props.extraClasses) {
      classes.push(props.extraClasses.join(' '));
    }

    return classes.join(' ');
  },

  render() {
    return <div className={ this.classes() } >{ this.props.children }</div>;
  }
});
