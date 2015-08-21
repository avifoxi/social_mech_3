// we're in rails... so react is a global. ok. 

'use strict';

var Input = ReactBootstrap.Input;

var UsernameForIDFormInputs = React.createClass({
  getInitialState() {
    return {
      value: ''
    };
  },
  render: function () {
    return (
      <div>
        <Input 
          type='text'
          value={this.state.value}
          placeholder='Enter text'
          label='Working example with validation'
          help='Validation is based on string length.'
          /* bsStyle={this.validationState()} */ 
          hasFeedback
          ref='input'
          groupClassName='group-class'
          labelClassName='label-class'
          onChange={this.handleChange}
        />


      </div>
    );
  },
  handleChange: function(e){
    this.setState({
      value: e.target.value
    });
  }
});

module.exports = UsernameForIDFormInputs;