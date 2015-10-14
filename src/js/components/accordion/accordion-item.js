import React from 'react';

const Type = React.PropTypes;

export default React.createClass({

  displayName: "AccordionItem",

  propTypes: {
    isOpen: Type.bool,
    title: Type.node.isRequired,
    containerClasses: Type.arrayOf(Type.string)
  },

  getDefaultProps() {
    return {
      isOpen: false
    };
  },

  getInitialState() {
    return {
      isOpen: this.props.isOpen
    }
  },

  // this sets the state when the expand all / collapse all in the parent passes isOpen prop
  componentWillReceiveProps(nextProps) {
    this.setState({isOpen: nextProps.isOpen})
  },

  handleClick(){
    this.setState({
      isOpen: !this.state.isOpen
    })
  },

  iconClasses() {
    var classes = [
      'mr1'
    ];
    this.state.isOpen ? classes.push('icon-collapse','blue-70') : classes.push('icon-expand','blue-70');
    return classes.join(' ');
  },

  headerClasses() {
    var classes = [
      'pointer',
      'flex',
      'flex-center',
      'py2'
    ];

    return classes.join(' ');

  },

  contentClasses() {
    var classes = [];
    this.state.isOpen ? classes.push('is-open') : classes.push('is-closed', 'overflow-hidden');
    return classes.join(' ');
  },

  render() {
    return (
      <div className={this.props.containerClasses.join(' ')}>
        <div className={this.headerClasses()} onClick={this.handleClick}>
          <span className={this.iconClasses()}/>
          {this.props.title}
        </div>
        <div className={this.contentClasses()}>{this.props.children}</div>
      </div>
    );
  }

});
