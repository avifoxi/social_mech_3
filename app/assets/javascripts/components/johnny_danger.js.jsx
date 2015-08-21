// must use rails asset pipeline, at the least for node modules that use react. 
// bc if you don't, the npm package overwrites the react_rails installed React, adn 
//  errors galore
'use strict';

var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;

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
         <Modal show={true} onHide={function(){ return 'foo' }} >
          <Modal.Body>
            <h4>Text in a modal</h4>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
          </Modal.Body>
        </Modal>

        
      </div>
    );
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
  }
});

       

window.JohnnyDanger = JohnnyDanger;