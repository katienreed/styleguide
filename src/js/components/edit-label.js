import React from 'react';
import Icon from './icon';
import Popover from './popover';
import FieldError from './forms/field-error';

const {
  createClass,
  PropTypes: Type
} = React;

export default createClass({
  displayName: 'EditLabel',

  propTypes: {
    label: Type.string.isRequired,
    placeholder: Type.string,
    isValid: Type.func,
    errorMessage: Type.string,
    onSave: Type.func.isRequired,
    onDelete: Type.func.isRequired
  },

  getInitialState() {
    return {
      isEditing: false,
      saveDisabled: true,
      hasErrors: false,
      textHeight: 34
    };
  },

  _triggerEdit() {
    this.setState({ isEditing: true });
  },

  _handleSave() {
    const val = this.refs.labelInput.getDOMNode().value;

    if ( this.props.isValid ) {

      if ( this.props.isValid(val) ) {
        this.setState({ isEditing: false });
        this.props.onSave(val);
      } else {
        this.setState({ hasErrors: true });
      }

    } else {
      this.setState({ isEditing: false });
      this.props.onSave(val);
    }
  },

  _handleDelete() {
    this.props.onDelete();
  },

  _handleKey(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this._handleSave();
    }

    const target = e.target;
    const height = target.scrollHeight;

    this.setState({ textHeight: height });
  },

  _checkContent(e) {
    const val = e.target.value.trim();

    if (val.length === 0) {
      this.setState({ saveDisabled: true });
    } else if ( this.state.saveDisabled ) {
      this.setState({ saveDisabled: false });
    }
  },

  _getSaveClasses() {
    let classes = ['px2', 'small', 'm0'];
    const { saveDisabled } = this.state;

    if (saveDisabled) {
      classes.push('grey-25');
    } else {
      classes.push('blue');
    }

    return classes;
  },

  _showError() {
    return (
      <div className="fill px2">
        <FieldError message={this.props.errorMessage} />
      </div>
    );
  },

  render() {
    if(this.state.isEditing) {
      const textStyle = { 
        height: this.state.textHeight,
        width: "auto"
      };

      return (
        <div className="flex flex-center flex-wrap">
          {this.state.hasErrors ? this._showError() : void 0}
          <textarea
            className="field-light mr2 py1 h3 bold no-resize flex-grow"
            defaultValue={this.props.label}
            onKeyDown={this.state.saveDisabled ? void 0 : this._handleKey}
            onKeyUp={this._checkContent}
            placeholder={this.props.placeholder}
            ref="labelInput"
            style={textStyle}
          ></textarea>
          <Icon 
            name="check" 
            extraClasses={this._getSaveClasses()}
            onClick={this.state.saveDisabled ? void 0 : this._handleSave}
           />
          <Popover>
            <Icon 
              name="delete" 
              extraClasses={["blue", "px2", "small", "m0"]} 
            />
            <div className="white">
              <h4>Are you sure?</h4>
              {this.props.children}
              <div className="right-align">
                <button className="button-link button-sm button-secondary mr2">Cancel</button>
                <button className="button-danger button-sm" onClick={this._handleDelete} >Delete</button>
              </div>
            </div>
          </Popover>
        </div>
      );
    } else {
      return (
        <div className="flex flex-center hover-container" >
          <h3 className="blue py1 m0">{this.props.label}</h3>
          <Icon name="pencil" extraClasses={["blue", "py1", "ml1", "small", "m0", "hover-show"]} onClick={this._triggerEdit} />
        </div>
      );
    }
  }
});
