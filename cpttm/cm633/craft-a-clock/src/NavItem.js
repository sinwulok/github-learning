import React from "react";

class NavItem extends React.Component {
  render() {
    let activeCurrentPage = "";
    if (this.props.active) {
      activeCurrentPage = "bg-slate-700";
    }

    return (
        <li>
          <a
            href={this.props.url}
            class={`block py-2 px-4 text-slate-300 hover:bg-slate-700 hover:text-white rounded-md ${activeCurrentPage}`}
          >
            {this.props.children}
          </a>
        </li>
    );
  }
}

export default NavItem;
