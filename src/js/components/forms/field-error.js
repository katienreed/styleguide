import React from 'react';
import Icon from '../icon';

const {
  createClass,
  PropTypes : Type
} = React;

export default React.createClass({
  displayName: 'FieldError',

  propTypes: {
    message: Type.string.isRequired
  },

  render() {
    return (
      <span className="orange small">
        <Icon name="alert" extraClasses={['mr1']} />
        {this.props.message}
      </span>
    );
  }
});
