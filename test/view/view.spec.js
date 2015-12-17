import { expect } from 'chai';
import TestUtils from 'react/lib/ReactTestUtils';
import React from 'react';
import View from 'view/view';

describe('View', () => {
  describe('#actionBar()', () => {

    // should I pass in example props? and then test said props?
    // ^^ is this what shallow rendering is?

    it('returns null if this.state.bars.action.use is null', () => {
      let component = TestUtils.renderIntoDocument(<View />)
      expect(component.actionBar()).to.be.null
    })

    // test to make sure the component renders
    it('renders the component if called to the view', () => {
      let component = TestUtils.renderIntoDocument(<View />)

    })

    // test for the action buttons to appear if the length is greater than one

    // test for the component to be mounted

    // test for the component to be unmounted

    // test to make sure the title renders correctly
    it('#title()', () => {
      let simple_select = TestUtils.renderIntoDocument(<SimpleSelect title={this.props.title}/>)
      expect(this.props.title.length).to.equal(1)
    })

    // test to make sure the description renders correctly
    it('#description()', () => {
        TestUtils.findRenderedDOMComponentWithClass(
          render({ type: 'text' }), 'fake-Text'
        );
      });

    // test inline styles in functions() - e.g. title, description, render?



  })
});
