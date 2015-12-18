import { expect } from 'chai';
import TestUtils from 'react/lib/ReactTestUtils';
import React from 'react';
import View from 'view/view';
import ActionBar from 'view/bars/action-bar';

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

  })

  describe('ActionBar', () => {
    describe('#title()', () => {
      it('renders the prop title',() => {
        let component = TestUtils.renderIntoDocument(<ActionBar title={'Test Title'} />)
        let elem = TestUtils.scryRenderedDOMComponentsWithTag(component, 'h3')
        expect(elem.length).to.equal(1)
      })
    })

    describe('#description()', () => {
      it('renders the prop description',() => {
        let component = TestUtils.renderIntoDocument(<ActionBar description={'Test Description'} />)
        let elem = TestUtils.scryRenderedDOMComponentsWithClass(component, 'flex-auto right-align')
        expect(elem.length).to.equal(1)
        })
    })
  })
});
