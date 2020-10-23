import React from "react";
import axios from 'axios';
import { noAuto } from "@fortawesome/fontawesome-svg-core";

class testAPI extends React.Component {
    // State will apply to the posts object which is set to loading by default
    state = {
      buyers: [],
      isLoading: true,
      errors: null
    };
    // Now we're going to make a request for data using axios
    getBuyers() {
      axios
        // This is where the data is hosted
        .get("http://127.0.0.1:5000/buyers")
        // Once we get a response and store data, let's change the loading state
        .then(response => {
          this.setState({
            buyers: response.data.buyers,
            isLoading: false
          });
        })
        // If we catch any errors connecting, let's update accordingly
        .catch(error => this.setState({ error, isLoading: false }));
    }
    // Let's our app know we're ready to render the data
    componentDidMount() {
      this.getBuyers();
    }
    // Putting that data to use
    render() {
      const { isLoading, buyers } = this.state;
      return (
        <React.Fragment>
          <h2>Buyers in database</h2>
          <div>
            {!isLoading ? (
              buyers.map(buyer => {
                const { email, first_name, last_name, balance, password } = buyer;
                return (

                    <div style={{ justifyContent: 'center', marginLeft:100}}>
                           <h5 className="card-title">{email}</h5>
                          <h6 className="card-subtitle mb-2 text-muted">
                          {first_name}             
                          </h6>
                          <h6 className="card-subtitle mb-2 text-muted">
                          {last_name}             
                          </h6>
                          <h6 className="card-subtitle mb-2 text-muted">
                          {password}             
                          </h6>
                          <h6 className="card-subtitle mb-2 text-muted">
                          {balance}             
                          </h6>
                        </div>
                );
              })
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </React.Fragment>
      );
    }
  }

  export default testAPI;