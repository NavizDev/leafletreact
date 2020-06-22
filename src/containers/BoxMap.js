import React, { useState, useEffect } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import convertCsvToObj from "../utils/convertCsvToJson";
import { Icon } from "leaflet";

const monument = new Icon({
  iconUrl: "/img/icon.svg",
  iconSize: [24, 24],
});

const BoxMap = () => {
  const position = [-33.437933957, -70.651292865];
  const zoom = 14;
  const [data, setData] = useState(null);

  async function getDataJsonAsync() {
    try {
      const response = await fetch(
        "https://cswcl.github.io/fake-api/monumentos_historicos_extracto.geojson"
      );
      const res = await response.json();
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async function getDataCsvAsync() {
    try {
      const response = await fetch(
        "http://cswcl.github.io/fake-api/monumentos_historicos_extracto.csv"
      );
      const res = await response.text();
      let convert = convertCsvToObj(res);
      return convert;
      //setDataCsv(convert);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    Promise.all([getDataJsonAsync(), getDataCsvAsync()]).then((values) => {
      let temp = values[0].features;
      let temp2 = values[1];
      temp.forEach((element) => {
        temp2.forEach((item) => {
          if (element.properties.id == item.id) {
            element.properties.name = item.name;
          }
        });
      });
      setData(temp);
    });
  }, []);

  return (
    <Map center={position} zoom={zoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {!!data &&
        data.map((point) => {
          return (
            <Marker
              key={point.properties.id}
              position={[
                point.geometry.coordinates[1],
                point.geometry.coordinates[0],
              ]}
              icon={monument}
            >
              <Popup>
                <h4>{point.properties.name}</h4>
                <p>Latitud: {point.geometry.coordinates[1]}</p>
                <p>Longitud: {point.geometry.coordinates[0]}</p>
              </Popup>
            </Marker>
          );
        })}
    </Map>
  );
};

export default BoxMap;
