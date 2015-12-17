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
  })
});
