import React from 'react'; 

export class Quantity extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        quantity: 1,
        show: true,
        max: 5,
        min: 0
      };
    }
  
    IncrementItem = () => {
        this.setState(prevState => {
          if(prevState.quantity < 100) {
            return {
              quantity: prevState.quantity + 1
            }
          } else {
            return null;
          }
        });
    }
    DecreaseItem = () => {
        this.setState(prevState => {
          if(prevState.quantity > 0) {
            return {
              quantity: prevState.quantity - 1
            }
          } else {
            return null;
          }
        });
      }
      ToggleClick = () => {
        this.setState({
          show: !this.state.show
        });
      }
      handleChange = (event) => {
        this.setState({quantity: event.target.value});
      }
    
      render() {
    
        return ( <div>
          <button onClick={this.IncrementItem}>+</button>
          <input className="inputne" value={this.state.quantity} onChange={this.handleChange}/>
          <button onClick = {this.DecreaseItem}>-</button>
          </div>
        );
      }
    }

export default Quantity;