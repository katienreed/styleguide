import { expect } from 'chai';
import TestUtils from 'react/lib/ReactTestUtils';
import React from 'react';
import View from 'view/view';

describe('View', () => {
  describe('#actionBar()', () => {


    it('returns null if this.state.bars.action.use is null', () => {
      let component = TestUtils.renderIntoDocument(<View />)
      expect(component.actionBar()).to.be.null
    })

    it('returns null if this.state.bars.action.visible is false', () => {
      let component = TestUtils.renderIntoDocument(<View />)
      component.setState({bars: {action: { use: true, visible: false}}})
      expect(component.actionBar()).to.be.null
    })

    it('returns null if this.state.bars.action.visible is false', () => {
      let component = TestUtils.renderIntoDocument(<View />)
      component.setState({bars: {action: { use: true, visible: true}}})
      expect(component.actionBar()).to.be.ok
    })

    // test for the action buttons to appear if the length is greater than one


    // test for the component to be mounted

    // test for the component to be unmounted

    // test to make sure the title renders correctly
    // it('#title()', () => {
    //   let simple_select = TestUtils.renderIntoDocument(<SimpleSelect title={this.props.title}/>)
    //   expect(this.props.title.length).to.equal(1)
    // })
    //
    // // test to make sure the description renders correctly
    // it('#description()', () => {
    //     TestUtils.findRenderedDOMComponentWithClass(
    //       render({ type: 'text' }), 'fake-Text'
    //     );
    //   });

    // test inline styles in functions() - e.g. title, description, render?

  })
});
