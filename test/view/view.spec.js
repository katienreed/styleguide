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

  })
});
