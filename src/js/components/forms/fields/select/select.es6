import FieldErrors from '../../field-errors';
import React from 'react';
import SimpleSelect from './simple-select';

const Type = React.PropTypes;

export default React.createClass({

  displayName: "FieldSelect",

  propTypes: {
    disabled: Type.bool,
    multiple: Type.bool,
    errors: Type.array,
    extraClasses: Type.array,
    fieldColor: Type.oneOf(['light', 'dark']),
    includeBlank: Type.oneOfType([Type.bool, Type.string]),
    label: Type.string,
    name: Type.string,
    onChange: Type.func,
    options: Type.oneOfType([Type.object, Type.array]).isRequired,
    placeholder: Type.string,
    value: Type.oneOfType([Type.object, Type.string, Type.number])
  },

  getDefaultProps() {
    return {
      disabled: false,
      errors: [],
      fieldColor: 'light',
      onChange: function() {},
      value: null
    }
  },

  getInitialState() {
    return {
      disabled: this.props.disabled || false,
      errors: this.props.errors || [],
    };
  },

  containerClasses() {
    let classes = ['relative'];
    classes.push(this.props.extraClasses);
    return classes.join(' ');
  },

  handleChange(e) {
    this.props.onChange();
    this.resetErrors();
  },

  label() {
    if (this.props.label) {
      return (
        <label className="px2 mb1 relative">
          {this.props.label}
        </label>
      );
    }
  },

  resetErrors() {
    this.setState({errors: []});
  },

  render() {
    return (
      <div>
        {this.label()}
        <SimpleSelect disabled={this.props.disabled}
                      multiple={this.props.multiple}
                      fieldColor={this.props.fieldColor}
                      hasError={this.state.errors.length > 0}
                      includeBlank={this.props.includeBlank}
                      name={this.props.name}
                      onChange={this.handleChange}
                      options={this.props.options}
                      placeholder={this.props.placeholder}
                      value={this.props.value} />
        <FieldErrors errors={this.state.errors} />
      </div>
    );
  }
});
