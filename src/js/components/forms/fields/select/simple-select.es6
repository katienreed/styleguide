import React from 'react';
import _ from 'underscore';
import Overlay from '../../../overlays/overlay-click';

const Type = React.PropTypes;

export default React.createClass({

  displayName: "SimpleSelect",

  propTypes: {
    disabled: Type.bool,
    multiple: Type.bool,
    multipleToggleAll: Type.bool,
    fieldColor: Type.oneOf(['light', 'dark']),
    hasError: Type.bool,
    includeBlank: Type.bool,
    name: Type.string,
    onChange: Type.func,
    options: Type.oneOfType([Type.object, Type.array]).isRequired,
    placeholder: Type.string,
    value: Type.oneOfType([Type.string, Type.number, Type.array])
  },

  getDefaultProps() {
    return {
      fieldColor: 'light',
      hasError: false,
      multiple: false,
      onChange: function() {},
      options: []
    };
  },

  getInitialState() {
    return {
      show_options: false,
      value: this.props.value || null
    };
  },

  componentDidMount() {
    document.addEventListener('click', this.onDocumentClick);
  },

  componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentClick);
  },

  componentDidUpdate(prevProps, prevState) {
    if (this.state.value != prevState.value) this.props.onChange();
  },

  arrowClasses() {
    let classes = ['h6', 'ml1', 'relative'];
    classes.push(this.props.disabled ? 'grey-50' : 'blue-70');
    classes.push(this.state.show_options ? 'icon-arrow-up' : 'icon-arrow-down');
    return classes.join(' ');
  },

  buildValueArray(value) {
    let array = this.state.value ? this.state.value.slice(0) : [];
    let index = array.indexOf(value);

    // if the value is already in the array, and vice versa (toggling)
    index > -1 ? array.splice(index, 1) : array.push(value)

    return array;
  },

  onClickOption(option) {

    let value = this.props.multiple ? this.buildValueArray(option) : option;

    this.setState({
      value: value,
      show_options: this.props.multiple
    });
  },

  onClickOptionEmpty() {
    this.setState({
      value: null,
      show_options: false
    });
  },

  onDocumentClick(e) {
    if (!this.getDOMNode().contains(e.target)) {
      this.setState({show_options: false})
    }
  },

  onClickValue() {
    if (!this.props.disabled) this.setState({show_options: !this.state.show_options});
  },

  onClickToggleAll() {

    let value = this.state.value || [];
    let options = this.props.options;

    if(options.length - value.length > 0) {
      // if not all options are selected, toggle on
      this.setState({value: this.props.options})
    } else {
      // otherwise, toggle off
      this.setState({value: []});
    }

  },

  optionsArray() {
    let options = this.props.options;
    return (typeof options === 'object' && Array.isArray(options)) ? options : false;
  },

  // for each option element
  optionClasses() {
    let classes = ['simple-select-option','bg-white','nowrap','option','pointer','py1','px3'];
    return classes;
  },

  // for the container element that holds the options
  optionsClasses() {
    let classes = ['absolute', 'bb', 'bl', 'br', 'bw-1', 'left-0', 'right-0', 'rounded-bottom-2'];
    classes.push(this.state.show_options ? 'bc-grey-50' : 'bc-grey-25');
    return classes;
  },

  optionsObject() {
    let options = this.props.options;
    return (typeof options === 'object' && !Array.isArray(options)) ? options : false;
  },

  renderOptions() {
    if (!this.props.disabled) {

      let emptyOption = (
        <div className={this.optionClasses().join(' ') + " grey-50"} onClick={this.onClickOptionEmpty}>
          {this.props.placeholder ? this.props.placeholder : "--"}
        </div>
      );

      let toggleAllOption = (
        <div className={this.optionClasses().concat('toggle-all').join(' ') + " grey-50 " + " "} onClick={this.onClickToggleAll}>
          <span>Select All</span>
        </div>
      );

      let options;

      if (this.optionsObject()) {
        options = this.renderOptionsFromObject();
      } else {
        options = this.renderOptionsFromArray()
      }

      if (this.state.show_options) {
        return (
          <div className={this.optionsClasses().join(' ')} style={{zIndex: 1000}}>
            {this.props.includeBlank ? emptyOption : false}
            {this.props.multipleToggleAll ? toggleAllOption : false}
            {options}
          </div>
        );
      }
    } else {
      return false;
    }
  },

  // options in a multiple select have a checkbox
  renderCheckbox(option) {
    let checkmarkSpacing = {width: 30, float: 'left'};

    // if option has been selected, show check.  otherwise, show empty space
    let todo = _.indexOf(this.state.value, option) > -1 ? <span className="icon-check blue-70 mr1"></span> : <span className="px1 ml1"></span>;
    return (
      <div style={checkmarkSpacing}>
        <span>{todo}</span>
      </div>
    );
  },

  renderOptionsFromArray() {
    return this.props.options.map((option, index) => {

      let classes = this.optionClasses();
      _.indexOf(this.state.value, option) > -1 ? classes.push('selected') : false;

      return (
        <div className={classes.join(' ') + ' grey-75'}
             key={index}
             onClick={this.onClickOption.bind(this, option)}>
          {this.props.multiple ? this.renderCheckbox(option) : false}
          {option}
        </div>
      );
    });
  },

  renderOptionsFromObject() {
    let classes = this.optionClasses().join(' ');
    return Object.keys(this.props.options).map((key, index) => {
      return (
        <div className={classes + ' grey-75'}
             key={index}
             onClick={this.onClickOption.bind(this, key)}>
          {this.props.options[key]}
        </div>
      );
    });
  },

  // since we might have several value (like in a multiple select),
  // a function will help
  valueToString() {
    let value = this.optionsArray() ? this.state.value : this.props.options[this.state.value];
    if(this.props.multiple && value) {
      value = value.join(', ')
    }
    return value || this.props.placeholder;
  },

  renderValue() {
    let arrowStyle = {top: 1, right: 3, fontSize: 12, height: 19};

    return (
      <div ref='simpleSelectValue' className={this.valueClasses()} onClick={this.onClickValue}>
        <div className='nowrap mr1'>
          {this.valueToString()}
        </div>
        <div className={this.arrowClasses()} style={arrowStyle} />
      </div>
    );
  },

  valueBorderClass() {
    if (this.props.hasError) {
      return 'bc-orange bc-orange-hover';
    } else if (this.props.disabled) {
      return 'bc-grey-10';
    } else if (this.state.show_options) {
      return 'bc-grey-50';
    } else {
      return this.props.fieldColor == 'light' ? 'bc-grey-25' : 'bc-white';
    }
  },

  valueClasses() {
    let classes = ['simple-select', 'b', 'bw-1', 'flex', 'flex-justify', 'p1', 'grey-75'];
    classes.push(this.valueBorderClass());
    classes.push(this.state.show_options ? 'rounded-top-2' : "rounded-2");
    if (this.props.disabled) {
      classes.push('disabled');
      classes.push(this.props.fieldColor == 'light' ? 'grey-10 bg-grey-10' : 'grey-50 bg-grey-15');
    } else {
      classes.push('pointer bg-white');
    }
    return classes.join(' ');
  },

  render() {
    return (
      <div className="relative simple-select">
        <input type="hidden"
               name={this.props.name}
               value={this.state.value}
               disabled={this.props.disabled} />
        {this.renderValue()}
        {this.renderOptions()}
      </div>
    );
  }
});
