import React from "react";
import "./App.css";

import ListItem from "./ListItem";

import SharedContext from "./SharedContext";
import ThemeSwitch from "./ThemeSwitch";

import { useState, useEffect, useContext } from "react";

function App() {
  const [selectedProducts, setSelectedProudcts] = useState([]);
  const [theme, setTheme] = useState("dark");

  toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  productSelectHandler = (product) => {
    // console.log(product);
    let newProductSelected = [...this.state.productSelect];

    if (newProductSelected.includes(product)) {
      //
      newProductSelected = this.state.productSelect.filter((productArr) => {
        return productArr !== product;
      });
    } else {
      //
      newProductSelected.push(product);
    }
  };

  themeModeSwitcher = (ThemeMode) => {
    theme: this.state.theme = "Dark" ?? "Light";
  };

  return (
    <ThemeModeProvider
      value={{
        themeName: this.state.themeName,
        themeToggle: this.state.themeToggle,
      }}
    >
      <div className="min-h-screen flex justify-center items-center px-4">
        <ThemeMode
          theme={this.state.theme}
          className="absolute top-12 right-12"
        />
        <div className="flex max-w-3xl mx-auto w-full gap-x-8">
          <div className="w-1/2">
            <h2 className="text-2xl font-bold">Apple Products</h2>

            <ul className="mt-4 flex flex-col gap-y-3">
              {this.state.products.map((product) => (
                <ListItem
                  key={product}
                  title={product}
                  active={this.state.productSelect.includes(product)}
                  onSelect={this.productSelectHandler}
                ></ListItem>
              ))}
            </ul>

            <p className="mt-3 text-slate-400 text-sm">
              {this.state.productSelect.length} item(s) selected
            </p>
          </div>
          <div className="w-1/2">
            <h2 className="text-2xl font-bold text-slate-400">
              Selected Products
            </h2>
            <p className="mt-4 text-slate-800 text-lg">
              {this.state.productSelect.join(", ")}
            </p>
          </div>
        </div>
      </div>
    </ThemeModeProvider>
  );
}

export default App;
