import React from "react";
import NavItem from "./NavItem";

class App extends React.Component {

  render() {

    return (
      <ul className="bg-slate-900 py-2 px-8 flex justify-center gap-x-2">
        <NavItem active={true} name="Google" url="#">Google</NavItem>
        <NavItem name="Apple" url="#">Apple</NavItem>
        <NavItem name="Microsoft" url="#">Microsoft</NavItem>
      </ul>
    );
  }
}

export default App;
