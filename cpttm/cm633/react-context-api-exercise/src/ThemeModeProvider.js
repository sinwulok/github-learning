import React from "react";
import SharedContext from "./ThemeContext";

class ThemeModeProvider extends React.Component {
  state = {
    themeMode: ["Dark", "Light"],
  };

  toggleThemeMode = () => {
    this.props.onClick(this.state.themeMode);
  };

  render() {
    return (
      <SharedContext.Provider
        value={this.state.themeMode}
        onClick={this.toggleThemeMode}
      >
        {this.props.children}
      </SharedContext.Provider>
    );
  }
}

export default ThemeModeProvider;
