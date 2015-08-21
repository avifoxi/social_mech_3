var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;

var JohnnyDanger = React.createClass({
  getInitialState: function(){
    return {
      showModal: false
    };
  },
  render: function () {
    return (
      <div>
        i so dangerious
         <Button 
          onClick={this.launchModal}
          >
          launch a modal
         </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
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
    this.setState({
      showModal: false
    });
  }
});


window.JohnnyDanger = JohnnyDanger;