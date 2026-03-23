import React from "react";
import SharedContext from "./ThemeContext";

class ListItem extends React.Component {
  toggleProductSelect = () => {
    this.props.onSelect(this.props.title);
  };

  render() {
    return (
      <SharedContext.Consumer>
        {(sharedData) => {
          <li
            className={`px-6 py-4 rounded-lg shadow hover:cursor-pointer transition ${
              this.props.active
                ? "bg-slate-800 text-white"
                : "bg-white hover:bg-slate-100"
            }`}
            onClick={this.toggleProductSelect}
          >
            {this.props.title}
          </li>;
        }}
      </SharedContext.Consumer>
    );
  }
}

export default ListItem;
