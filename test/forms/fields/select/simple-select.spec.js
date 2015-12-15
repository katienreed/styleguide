import { expect } from 'chai';
import TestUtils from 'react/lib/ReactTestUtils';
import React from 'react';
import SimpleSelect from 'forms/fields/select/simple-select';

describe('SimpleSelect', () => {

  let options_object = {123: 'one', 456: 'two'};
  let options_array = ['one', 'two'];

  describe('#onClickValue()', () => {
    let simple_select;
    it('toggels state.show_options', () => {

      simple_select = TestUtils.renderIntoDocument(<SimpleSelect />)
      TestUtils.Simulate.click(simple_select.refs.simpleSelectValue)
      expect(simple_select.state.show_options).to.be.true

      simple_select = TestUtils.renderIntoDocument(<SimpleSelect />)
      simple_select.setState({show_options: true})
      TestUtils.Simulate.click(simple_select.refs.simpleSelectValue)
      expect(simple_select.state.show_options).to.be.false

    })
  });

  describe('#arrowClasses()', () => {
     it('returns grey arrow if disabled', () => {
       let simple_select = TestUtils.renderIntoDocument(<SimpleSelect disabled={true}/>)
       let elem = TestUtils.scryRenderedDOMComponentsWithClass(simple_select, 'grey-50');
       expect(elem.length).to.equal(1)
     })
     it('returns blue arrow by default', () => {
       let simple_select = TestUtils.renderIntoDocument(<SimpleSelect disabled={false}/>)
       let elem = TestUtils.scryRenderedDOMComponentsWithClass(simple_select, 'blue-70');
       expect(elem.length).to.equal(1)
     })
   });

  describe('#optionsObject()', () => {
    it('returns this.props.options when an object if passed to options prop', () => {
      let simple_select = TestUtils.renderIntoDocument(<SimpleSelect options={options_object}/>)
      expect(simple_select.optionsObject()).to.deep.equal(options_object)
    })
    it('returns false when an array if passed to options prop', () => {
      let simple_select = TestUtils.renderIntoDocument(<SimpleSelect options={options_array} />)
      expect(simple_select.optionsObject()).to.be.false
    })
  });


  describe('#optionsArray()', () => {
    it('returns this.props.options when an array if passed to options prop', () => {
      let simple_select = TestUtils.renderIntoDocument(<SimpleSelect options={options_array}/>)
      expect(simple_select.optionsArray()).to.deep.equal(options_array)
    })
    it('returns false when an object if passed to options prop', () => {
      let simple_select = TestUtils.renderIntoDocument(<SimpleSelect options={options_object} />)
      expect(simple_select.optionsArray()).to.be.false
    })
  });

  describe('#onClickOption()', () => {

    let simple_select;

    beforeEach(() => {
      simple_select = TestUtils.renderIntoDocument(<SimpleSelect options={options_object} />)
      simple_select.setState({show_options: true})
      let options = TestUtils.scryRenderedDOMComponentsWithClass(simple_select, 'simple-select-option');
      TestUtils.Simulate.click(options[0])
    })

    it('sets state.value to the option that was clicked', () => {
      expect(simple_select.state.show_options).to.be.false
    })

    it('sets state.show_options back to false', () => {
      expect(simple_select.state.show_options).to.be.false
    })

  });

  it('expects one option element for each option given in an options array', () => {
    let simple_select = TestUtils.renderIntoDocument(<SimpleSelect options={['one','two']}/>)
    simple_select.setState({show_options: true})
    let options = TestUtils.scryRenderedDOMComponentsWithClass(simple_select, 'simple-select-option')
    expect(options.length).to.equal(2)
  });

  it('expects one option element for each option given in an options object', () => {
    let simple_select = TestUtils.renderIntoDocument(<SimpleSelect options={{123: 'one', 456: 'two'}}/>)
    simple_select.setState({show_options: true})
    let options = TestUtils.scryRenderedDOMComponentsWithClass(simple_select, 'simple-select-option')
    expect(options.length).to.equal(2)
  });

  it('expects an empty option if includeBlank is true', () => {
    let simple_select = TestUtils.renderIntoDocument(<SimpleSelect includeBlank={true} />)
    simple_select.setState({show_options: true})
    let option = TestUtils.scryRenderedDOMComponentsWithClass(simple_select, 'simple-select-option-empty')
    expect(option).to.exist
  });

  it('expect this.state.show_options to be true when value is clicked', () => {
    let simple_select = TestUtils.renderIntoDocument(<SimpleSelect />)
    TestUtils.Simulate.click(simple_select.refs.simpleSelectValue)
    expect(simple_select.state.show_options).to.be.true
  });

  it('expects the value to change to the option that was clicked', () => {
    let simple_select = TestUtils.renderIntoDocument(<SimpleSelect options={['foo','bar']} value={'foo'}/>)
    simple_select.setState({show_options: true})
    let options = TestUtils.scryRenderedDOMComponentsWithClass(simple_select, 'simple-select-option');
    TestUtils.Simulate.click(options[1])
    expect(simple_select.state.value).to.equal('bar')
  });

  it('sets the value to null when empty option is clicked', () => {
    let simple_select = TestUtils.renderIntoDocument(<SimpleSelect includeBlank={true} options={['foo','bar']} value={'foo'}/>)
    simple_select.setState({show_options: true})
    let options = TestUtils.scryRenderedDOMComponentsWithClass(simple_select, 'simple-select-option');
    TestUtils.Simulate.click(options[0])
    expect(simple_select.state.value).to.be.null
  });

});
