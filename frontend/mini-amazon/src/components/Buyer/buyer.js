import React, { Component } from 'react';

class buyer extends Component {
    render() {

        return (
           <div className="container">
            <div className="col-xs-8">
            <h1>React Axios Example</h1>
            {this.state.buyers.map((buyer) => (
              <div className="card">
               <div className="card-body">
                   <h5 className="card-title">{buyer.email}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                  {buyer.first_name}             
                  </h6>
                </div>
              </div>
            ))}
            </div>
           </div>
        );
      }
}
export default buyer;