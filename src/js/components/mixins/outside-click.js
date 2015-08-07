// This mixin requires a handleOutsideClick method to be defined within the component using it.
// Also, any other click handlers in the component should use event.stopPropagation to prevent the event from bubbling to the window

import React from 'react';

const {
  PropTypes : Type
} = React;

var OutsideClickMixin = {

  componentDidMount() {
    window.addEventListener('click', this._handleDocumentClick);
  },

  componentWillUnmount() {
    window.removeEventListener('click', this._handleDocumentClick);
  },

  _handleDocumentClick(e) {
    const target = e.target;
    const component = this.getDOMNode();

    if ( component === target || component.contains(target) ) {
      return true;
    } else {
      if (this.handleOutsideClick) {
        this.handleOutsideClick(e);
      } else {
        throw new Error("handleOutsideClick is not a defined method in this component.");
      }
    }
  }
}

export default OutsideClickMixin;
