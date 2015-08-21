// must use rails asset pipeline, at the least for node modules that use react. 
// bc if you don't, the npm package overwrites the version of React installed by react_rails, adn 
//  errors galore
'use strict';

var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;

var Billy = require('./UsernameForIDFormInputs');

var JohnnyDanger = React.createClass({
  getInitialState: function(){
    return {
      showModal: false
    };
  },
  render: function () {
    let callback = this.close,
      show = this.state.showModal; 
    return (
      <div ref='modal-parent'>
        i so dangerious
         <Button 
          onClick={this.launchModal}
          >
          launch a modal
         </Button>
         <Billy />
         <Modal show={this.state.showModal} onHide={this.close} >
          <Modal.Title>
            I am form
          </Modal.Title>
          <Modal.Body>
            <div ref='dangerForm' dangerouslySetInnerHTML={this.injectSimpleForm()} />
            <Button 
              onClick={this.handleSubmit}
              >
              Submit
             </Button>
          </Modal.Body>
        </Modal>

        
      </div>
    );
  },
  handleSubmit: function(){
    console.log( 
      $( React.findDOMNode( this.refs.dangerForm ).firstChild).serialize() );
  },
  launchModal: function(){
    this.setState({
      showModal: true
    });
  },
  close: function(){
    // onHide={callback}
    this.setState({
      showModal: false
    });
  },
  injectSimpleForm: function(){
    return {
      __html: this.props.form
    };
  }
});

// any root level component must be global to work well with react rails. 
// i think for server side rendering, this just makes sense
window.JohnnyDanger = JohnnyDanger;