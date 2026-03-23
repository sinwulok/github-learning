import React, { Component } from "react";

import "./App.css";

class App extends Component {

  state = {
    count: 100,
  };
  

  incres = () => {
    //
    this.setState({
      count: this.state.count + 1,
    })
  }

  decres = () => {
    this.setState({
      count: this.state.count - 1,
    })
  }

  render() {
    return (
      <>
        <h1>Counter App in React</h1>
        {/* <h2>{this.state.count}</h2> */}
        <input type="text" value={this.state.count} />
        <br />
        <button onClick={this.decres}>-</button>
        <button onClick={this.incres}>+</button>
      </>
    )
  }
}

export default App;