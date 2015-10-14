'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Type = _react2['default'].PropTypes;

exports['default'] = _react2['default'].createClass({

  displayName: "AccordionItem",

  propTypes: {
    isOpen: Type.bool,
    title: Type.node.isRequired,
    containerClasses: Type.arrayOf(Type.string)
  },

  getDefaultProps: function getDefaultProps() {
    return {
      isOpen: false
    };
  },

  getInitialState: function getInitialState() {
    return {
      isOpen: this.props.isOpen
    };
  },

  // this sets the state when the expand all / collapse all in the parent passes isOpen prop
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.setState({ isOpen: nextProps.isOpen });
  },

  handleClick: function handleClick() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  },

  iconClasses: function iconClasses() {
    var classes = ['mr1'];
    this.state.isOpen ? classes.push('icon-collapse', 'blue-70') : classes.push('icon-expand', 'blue-70');
    return classes.join(' ');
  },

  headerClasses: function headerClasses() {
    var classes = ['pointer', 'flex', 'flex-center', 'py2'];

    return classes.join(' ');
  },

  contentClasses: function contentClasses() {
    var classes = [];
    this.state.isOpen ? classes.push('is-open') : classes.push('is-closed', 'overflow-hidden');
    return classes.join(' ');
  },

  render: function render() {
    return _react2['default'].createElement(
      'div',
      { className: this.props.containerClasses.join(' ') },
      _react2['default'].createElement(
        'div',
        { className: this.headerClasses(), onClick: this.handleClick },
        _react2['default'].createElement('span', { className: this.iconClasses() }),
        this.props.title
      ),
      _react2['default'].createElement(
        'div',
        { className: this.contentClasses() },
        this.props.children
      )
    );
  }

});
module.exports = exports['default'];