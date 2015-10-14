import React from 'react';
import Styleguide from '../styleguide';
import PropsTable from '../style_guide_components/props-table';
import AccordionItem from '../components/accordion/accordion-item';

export default React.createClass({

  displayName: "AccordionsPage",

  getInitialState() {
    return {
      accordionOpen: false
    }
  },

  renderToggleAccordion() {

    var iconClasses = [
      'mr1'
    ];

    this.state.accordionOpen ? iconClasses.push('icon-collapse') : iconClasses.push('icon-expand');

    return <a onClick={this.toggleAccordion} className="flex flex-center mb1 blue-70 pointer">
        <span className={iconClasses.join(' ')} />
        <span>{this.state.accordionOpen ? "Collapse all" : "Expand all" }</span>
      </a>
  },

  toggleAccordion() {
    this.setState({accordionOpen: !this.state.accordionOpen});
  },

  render() {
    return <Styleguide title="Accordions">
      <div title="Accordions" description="The accordion styles for Namely">
        <PropsTable rows={
          [
            {
              'prop':'isOpen',
              'description':'Opens and closes the item with height and overflow css. Default: false'
            },
            {
              'prop': 'title',
              'description': 'The node or string that will be used to toggle the item.  Required.'
            },
            {
              'prop': 'containerClasses',
              'description': 'An array of css utility classes to style the container of the component'
            }
          ]
        }/>
        <hr />

        { this.renderToggleAccordion() }
        <AccordionItem
          title={<h3 className="mb0 blue-70">{"Accordion Item 1"}</h3>}
          isOpen={this.state.accordionOpen}
          containerClasses={['bt', 'bw-1', 'bc-blue-25', 'px2']} >
          <p>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In laoreet ipsum sapien, vitae posuere sapien consectetur sed. Suspendisse non lorem quis quam mollis vestibulum blandit sit amet lectus. Quisque sagittis sapien enim, quis maximus mauris fermentum non."}</p>
        </AccordionItem>

        <AccordionItem
          title={<h3 className="mb0 blue-70">{"Accordion Item 2"}</h3>}
          isOpen={this.state.accordionOpen}
          containerClasses={['bt', 'bw-1', 'bc-blue-25', 'px2']} >
          <p>{"Morbi elit dui, pellentesque a malesuada et, lobortis sit amet nisl. Integer purus lorem, sodales aliquam facilisis non, iaculis id nisl. Nam fringilla elementum turpis, a venenatis risus luctus ac. Ut rhoncus viverra mi, ut sodales nibh sollicitudin ut. Ut ut elit sit amet magna semper blandit. "}</p>
        </AccordionItem>

      </div>
    </Styleguide>
  }
});


