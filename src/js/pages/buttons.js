import React from 'react';
import Styleguide from '../styleguide';
import Button from '../components/buttons/button';
import ButtonGroup from '../components/buttons/button-group';
import PropsTable from '../style_guide_components/props-table';

export default React.createClass({
  displayName: "ButtonsPage",

  _logClick(e) {
    console.log("Button clicked!");
  },

  render() {
    return <Styleguide title="Button Styles">
      <div title="Button Styles" description="The button styles for Namely.">
        <PropsTable rows={
          [
            {
              'prop':'Type',
              'description':'Sets the color of the button. Default: null.'
            },
            {
              'prop':'Label',
              'description':'sets the text for the content inside the button. Default: null.'
            },
            {
              'prop':'Size',
              'description':'Sets the size of the button. Default: null.'
            },

            {
              'prop':'Disabled',
              'description':'Renders the button grey and unclickable. Default: false.'
            },

            {
              'prop':'Link',
              'description':'Attaches a link to the button. Default: false.'
            },

            {
              'prop':'Icon',
              'description':'Attaches an icon to the button. Default: null.'
            },

            {
              'prop':'extraClasses',
              'description':'?'
            }
          ]
        }/>
      </div>

      <div title="Base" description="The button styles for Namely app">
        <Button label="Base" onClick={this._logClick} />
      </div>

      <div title="Types">
        <Button label=".button" extraClasses={ ["mr3"] } />
        <Button label=".button-secondary" type="secondary" extraClasses={ ["mr3"] } />
        <Button label=".button-danger" type="danger" extraClasses={ ["mr3"] } />
        <Button label=".button:disabled" disabled={ true } />
      </div>

      <div title="Sizes">
        <Button label="Default Size" extraClasses={ ["mr3"] } />
        <Button label=".button-sm" size="sm" extraClasses={ ["mr3"] } />
        <Button label=".button-sm.button-danger" size="sm" type="danger" extraClasses={ ["mr3"] } />
        <Button label=".button-sm:disabled" size="sm" disabled={ true } />
      </div>

      <div title="Links">
        <Button label=".button-link" link={ true } extraClasses={ ["mr3"] } />
        <Button label=".button-link.button-secondary" type="secondary" link={ true } extraClasses={ ["mr3"] } />
        <Button label=".button-link.button-baby" type="baby" link={ true } extraClasses={ ["mr3"] } />
        <Button label=".button-link.button-danger" type="danger" link={ true } extraClasses={ ["mr3"] } />
        <Button label=".button-link:disabled" link={ true } disabled={ true } extraClasses={ ["mr3"] } />
        <Button label=".button-link.button-sm" size="sm" link={ true } extraClasses={ ["mr3"] } />
        <Button label=".button-link.button-sm.button-secondary" size="sm" type="secondary" link={ true } />
      </div>

      <div title="Icons">
        <Button label="Edit" extraClasses={ ["mr3"] } icon="pencil" />
        <Button label="Edit .button-sm" size="sm" extraClasses={ ["mr3"] } icon="pencil" />
        <Button label="view-stop .button-link.button-danger" type="danger" extraClasses={ ["mr3"] } icon="view-stop" link={ true } />
        <Button label="paperclip .button-sm:disabled" size="sm" icon="paperclip" disabled={ true } />
      </div>

      <div title="Directions">
        <Button label=".button-previous" type="previous" extraClasses={ ["mr3"] } />
        <Button label=".button-next" type="next" extraClasses={ ["mr3"] } />
        <Button label=".button-previous:disabled" type="previous" disabled={ true } extraClasses={ ["mr3"] } />
        <Button label=".button-next:disabled" type="next" disabled={ true } />
      </div>

      <div title="Groups">
        <ButtonGroup>
          <Button label="Cancel" link={ true } />
          <Button label="Save" />
        </ButtonGroup>

        <ButtonGroup type="actions">
          <ButtonGroup>
            <Button label="Delete" type="danger" />
          </ButtonGroup>

          <Button label="Cancel" link={ true } />
          <Button label="Save Progress" type="secondary" />
          <Button label="Publish" />
        </ButtonGroup>

        <ButtonGroup type="actions">
          <ButtonGroup>
            <Button label="Previous" type="previous" />
          </ButtonGroup>

          <Button label="Next" type="next" />
        </ButtonGroup>

        <ButtonGroup type="actions">
          <Button label="Cancel" link={ true } type="secondary" />
          <Button label="Publish" />
        </ButtonGroup>
      </div>

    </Styleguide>
  }
});
