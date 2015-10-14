import React from 'react';

const Type = React.PropTypes;

export default React.createClass({
  displayName: "DateField",

  propTypes: {
    disabled: Type.bool,
    extraClasses: Type.arrayOf(Type.string),
    fieldColor: Type.oneOf(['light', 'dark']),
    label: Type.string,
  },

  getDefaultProps() {
    return {
      disabled: false,
      fieldColor: 'light'
    }
  },

  label() {
    if(this.props.label) {
      return <label htmlFor={this.props.id} className="px2 mb1">{this.props.label}</label>;
    }
  },

  fieldClasses() {
    var classes = [];
    classes.push('field-'+this.props.fieldColor);
    return classes.join(' ');
  },

  iconClasses() {
    var classes = ['icon', 'icon-calendar', 'ml1'];
    this.props.disabled ? classes.push('grey-25') : classes.push('blue-70');
    return classes.join(' ');
  },

  classes() {
    var classes = ['date-field'];
    if(this.props.disabled) {
      classes.push('disabled');
    }
    if(this.props.readOnly) {
      classes.push('read-only');
    }
    classes.push(this.props.extraClasses);
    return classes.join(' ');
  },

  render() {
    return  <div className={this.classes()}>
        {this.label()}
        <br/>
        <input
          className={this.fieldClasses(' ')}
          disabled={this.props.disabled}
          readOnly={this.props.readOnly}
          type="text">
        </input>
        <span className={this.iconClasses()}></span>
      </div>
  }
});
