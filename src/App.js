import React from "react";
import "./App.css";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Header from "./components/Header";
import BoxMap from "./containers/BoxMap";

function App() {
  const position = [51.505, -0.09];
  return (
    <div className="App">
      <Header />
      <BoxMap />
    </div>
  );
}

export default App;
