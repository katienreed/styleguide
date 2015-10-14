import React from 'react';
import _ from 'underscore';

const Type = React.PropTypes;

export default React.createClass({
  displayName: "SimpleSelect",

  propTypes: {
    includeBlank: Type.oneOfType([Type.bool, Type.string]),
    options: Type.oneOfType([Type.object, Type.array]).isRequired,
    placeholder: Type.string,
    value: Type.oneOfType([Type.string, Type.number]),
    name: Type.string,
    borderColorClass: Type.string,
    onChange: Type.func
  },

  getDefaultProps() {
    return {
      borderColorClass: 'bc-grey-25'
    }
  },

  componentWillMount() {
    this.setState({value: this.props.value || null});
  },

  componentDidMount() {
    document.addEventListener('click', this.onDocumentClick);
  },

  componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentClick);
  },

  componentDidUpdate(prevProps, prevState) {
    if(this.state.value != prevState.value) {
      this.props.onChange();
    }
  },

  getInitialState() {
    return {
      show_options: false
    }
  },

  onDocumentClick(e) {
    let componentNode = this.getDOMNode();
    let targetNode = e.target;
    if(!componentNode.contains(targetNode)) {
      this.setState({show_options: false})
    }
  },

  onClickOption(option) {
    this.setState({
      value: option,
      show_options: false
    });
  },

  onClickOptionEmpty() {
    this.setState({
      value: null,
      show_options: false}
    );
  },

  onClickValue() {
    if(!this.props.disabled) {
      this.setState({show_options: !this.state.show_options});
    }
  },

  optionsArray() {
    let options = this.props.options;
    return (typeof options === 'object' && Array.isArray(options)) ? options : false;
  },

  optionsObject() {
    let options = this.props.options;
    return (typeof options === 'object' && !Array.isArray(options)) ? options : false;
  },

  renderValue() {

    let options = this.props.options;
    let value = this.optionsArray() ? this.state.value : this.props.options[this.state.value];

    let valueContainerClasses = [
      'b',
      'bw-1',
      'flex',
      'flex-justify',
      'p2',
      this.state.show_options ? 'rounded-top-2' : 'rounded-2',
      this.props.disabled ? 'grey-50' : 'pointer',
      this.state.show_options ? 'bc-grey-25' : this.props.borderColorClass
    ];
    let valueClasses = ['nowrap','mr1'];
    let arrowClasses = [
      'h6',
      'ml1',
      'relative',
      this.props.disabled ? 'grey-50' : 'blue-70',
      this.state.show_options ? 'icon-arrow-up' : 'icon-arrow-down'
    ];
    let arrowStyle = {
      top: 1
    };

    return (
      <div className={valueContainerClasses.join(' ')} onClick={this.onClickValue}>
        <div className={valueClasses.join(' ')}>{value ? value : this.props.placeholder}</div>
        <div className={arrowClasses.join(' ')} style={arrowStyle} />
      </div>
    );
  },

  renderOptionsFromObject(classes) {
    return Object.keys(this.props.options).map( (key, index) => {
      return (
        <div key={index} className={classes.join(' ')} onClick={this.onClickOption.bind(this, key)}>
          {this.props.options[key]}
        </div>
      );
    });
  },

  renderOptionsFromArray(classes) {
    return this.props.options.map((option, index) => {
      return (
        <div key={index} className={classes.join(' ')} onClick={this.onClickOption.bind(this, option)}>
          {option}
        </div>
      );
    });
  },

  renderOptions() {
    let optionsContainerClasses = [
      'absolute',
      'bg-white',
      'bb',
      'bl',
      'br',
      'bw-1',
      'left-0',
      'right-0',
      'rounded-bottom-2',
      this.state.show_options ? 'bc-grey-25' : this.props.borderColorClass
    ];
    let optionClasses = [
      'bg-white',
      'nowrap',
      'option',
      'pointer',
      'p2'
    ];
    let emptyOption = (
      <div className={optionClasses.concat('grey-50').join(' ')} onClick={this.onClickOptionEmpty}>
        {typeof this.props.includeBlank == "string" ? this.props.includeBlank : "--"}
      </div>
    );

    let options = this.optionsObject() ? this.renderOptionsFromObject(optionClasses) : this.renderOptionsFromArray(optionClasses);

    return (
      <div className={optionsContainerClasses.join(' ')} style={{zIndex: 1000}}>
        {this.props.includeBlank ? emptyOption : false}
        {options}
      </div>
    );
  },

  render() {

    let value = this.renderValue();
    let options = this.renderOptions();

    return (
      <div className="simple-select relative">
        <input type="hidden" name={this.props.name} value={this.state.value} disabled={this.props.disabled} />
        {value}
        {this.state.show_options ? options : false}
      </div>
    );
  }
});
