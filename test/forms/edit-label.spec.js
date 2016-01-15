import { expect } from 'chai';
import TestUtils from 'react/lib/ReactTestUtils';
import React from 'react';
import EditLabel from 'forms/edit-label';
import Sinon from 'sinon';

describe('EditLabel', () => {
  let callback = Sinon.spy();

  let props = {
    label: "Label-test",
    placeholder: "Placeholder-test",
    errorMessage: "Error-message-test",
    onSave: callback,
    onDelete: callback
  }

  let component;
  let editLabel;
  beforeEach(() => {
    component = TestUtils.renderIntoDocument(
      <EditLabel {...props} />
    );
    editLabel = React.findDOMNode(component);
  })

  it('renders successfully', () => {
    TestUtils.isElement(component);
  });
});
